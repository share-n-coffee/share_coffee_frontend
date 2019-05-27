import React, { Component } from "react";
import PropTypes from "prop-types";
import TopicEditer from "./topicEditer";
import { Tab, TabContainer } from "../../../ui/core/home";
import PageTitle from "../../../modules/PageTitle";
import { request } from "../../../helpers/requests";
import Header from "../../../common/Header";
import * as URL from "../../../constants";
import TopicFront from "../../TopicFront";
import { DropdownContent, DropdownItem, Dropdown } from "../../../ui/components/dropdown";

class TopicDropdown extends Component {
  state = {
    subscribers: [],
    openSubscribers: "",
    error: "",
  };

  componentDidMount() {
    this.getSubscribers(this.props.id);
  }

  getSubscribers = id => {
    request.get(URL.GET_TOPIC_SUBSCRIBERS(id)).then(data => {
      this.setState({
        subscribers: data.object,
        error: data.message,
      });
    });
  };

  openSubscribers = id => {
    if (this.state.openSubscribers === id) {
      this.setState({ openSubscribers: "" });
    } else {
      this.setState({ openSubscribers: id });
    }
  };

  render() {
    const { subscribers, openSubscribers } = this.state;
    const { id } = this.props;

    return (
      <Dropdown
        length={subscribers.length}
        onClick={() => subscribers.length > 0 && this.openSubscribers(id)}
        open={openSubscribers === id}
      >
        {subscribers.length > 0 ? `Subscribers (${subscribers.length})` : `(0 Subscribers)`}
        <DropdownContent open={openSubscribers === id}>
          {subscribers.map(subscriber => (
            <DropdownItem key={subscriber._id}>
              {subscriber.firstName} {subscriber.lastName}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    );
  }
}

class oneTopic extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    event: [],
    activeTab: "Description",
    isEdit: false,
    linkNoHover: true,
    error: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    request.get(URL.ONE_EVENT(this.props.match.params.id)).then(data => {
      console.log(data);
      this.setState({
        event: data.object,
        error: data.message,
      });
    });
  }

  openTab(name) {
    this.setState({ activeTab: name });
  }

  showEditForm() {
    this.setState({ isEdit: true });
  }

  mouseEvents = {
    mouseOver: () => {
      this.setState({ linkNoHover: false });
    },
    mouseOut: () => {
      this.setState({ linkNoHover: true });
    },
    click: () => {
      this.props.history.push("/admin");
      this.setState({ openEvent: false });
    },
  };

  render() {
    const { event, activeTab, isEdit } = this.state;
    return (
      <>
        <Header
          isActive={true}
          isAdmin={true}
          hasDepartment={false}
          avatar={sessionStorage.getItem("avatar")}
          name={`${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}`}
        />
        <PageTitle
          title={this.state.linkNoHover ? event.title : "← Back"}
          mouseOver={this.mouseEvents.mouseOver}
          mouseOut={this.mouseEvents.mouseOut}
          click={this.mouseEvents.click}
        />
        <TabContainer>
          <Tab onClick={() => this.openTab("Description")} active={activeTab === "Description"}>
            Description
          </Tab>
          <Tab onClick={() => this.openTab("Upcoming")} active={activeTab === "Upcoming"}>
            Upcoming
          </Tab>
        </TabContainer>
        {activeTab === "Description" ? (
          <div>
            {!isEdit ? (
              <div>
                <TopicFront match={this.props.match} isAdmin={true} history={this.props.history} />
              </div>
            ) : (
              <TopicEditer id={event._id} />
            )}
          </div>
        ) : (
          <div className={"one-topic"}>
            <div className={"title"}>
              <span className={`event-status ${event.active ? "active" : ""}`} />
              {event.title}
            </div>

            <TopicDropdown id={event._id} />
            <span>Place: </span>
            <div>{event.address}</div>
            <span>Time:</span>
            <div>{event.options.times}</div>
            <button style={{ visibility: "hidden" }} />
          </div>
        )}
      </>
    );
  }
}

oneTopic.propTypes = {
  loggedIn: PropTypes.bool,
  currentlySending: PropTypes.bool,
  history: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.object,
  dispatch: PropTypes.func,
};

export default oneTopic;
