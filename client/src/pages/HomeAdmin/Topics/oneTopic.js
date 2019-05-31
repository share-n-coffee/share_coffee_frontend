import React, { Component } from "react";
import PropTypes from "prop-types";
import TopicEditer from "./topicEditer";
import { Tab, TabContainer } from "../../../ui/core/home";
import PageTitle from "../../../modules/PageTitle";
import { request } from "../../../helpers/requests";
import Header from "../../../common/Header";
import * as URL from "../../../constants";
import TopicFront from "../../Events/TopicFront";
import { DropdownContent, DropdownItem, Dropdown } from "../../../ui/components/dropdown";

class TopicDropdown extends Component {
  state = {
    openSubscribers: "",
    error: "",
  };

  openSubscribers = id => {
    if (this.state.openSubscribers === id) {
      this.setState({ openSubscribers: "" });
    } else {
      this.setState({ openSubscribers: id });
    }
  };

  render() {
    const { openSubscribers } = this.state;
    const { id, subscribers } = this.props;
    const length = subscribers.filter(subscriber => subscriber && subscriber.firstName).length;
    return (
      <Dropdown
        length={length}
        onClick={() => subscribers.length > 0 && this.openSubscribers(id)}
        open={openSubscribers === id}
      >
        {subscribers && length > 0 ? `Subscribers (${length})` : `(0 Subscribers)`}
        <DropdownContent open={openSubscribers === id}>
          {subscribers.map(
            subscriber =>
              subscriber &&
              subscriber.firstName && (
                <DropdownItem key={subscriber._id}>
                  {subscriber.firstName} {subscriber.lastName}
                </DropdownItem>
              ),
          )}
        </DropdownContent>
      </Dropdown>
    );
  }
}

class oneTopic extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    topic: [],
    events: [],
    activeTab: "Description",
    isEdit: false,
    linkNoHover: true,
    error: "",
  };

  componentDidMount() {
    this.getData();
    this.getTopicEvents();
  }

  getData() {
    request.get(URL.ONE_TOPIC(this.props.match.params.id)).then(data => {
      this.setState({
        topic: data.object.data.find(data => this.props.match.params.id === data._id),
        error: data.message,
      });
    });
  }

  getTopicEvents() {
    request.get(URL.TOPIC_EVENTS(this.props.match.params.id)).then(data => {
      console.log(data.object.data);
      this.setState({
        events: data.object.data,
        error: data.message,
      });
    });
  }

  timestamp = createdTime => {
    let date = new Date(createdTime);
    let years = date.getFullYear();
    let months = "0" + (date.getMonth() + 1);
    let days = "0" + date.getDate();
    return days.substr(-2) + "." + months.substr(-2) + "." + years;
  };

  openTab(name) {
    this.setState({ activeTab: name });
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
    const { topic, activeTab, isEdit, events } = this.state;
    return (
      <>
        <Header
          isActive={true}
          isAdmin={true}
          hasDepartment={false}
          avatar={sessionStorage.getItem("avatar")}
          name={`${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}`}
        />
        <main>
          <PageTitle
            title={this.state.linkNoHover ? topic && topic.title : "← Back"}
            mouseOver={this.mouseEvents.mouseOver}
            mouseOut={this.mouseEvents.mouseOut}
            click={this.mouseEvents.click}
            withShadowContainer={false}
          />
          <TabContainer>
            <Tab onClick={() => this.openTab("Description")} active={activeTab === "Description"}>
              Description
            </Tab>
            <Tab onClick={() => this.openTab("Upcoming")} active={activeTab === "Upcoming"}>
              Upcoming
            </Tab>
          </TabContainer>
          <div className="shadow_container" />
          {activeTab === "Description" ? (
            <div>
              {!isEdit ? (
                <div>
                  <TopicFront
                    match={this.props.match}
                    isAdmin={true}
                    history={this.props.history}
                  />
                </div>
              ) : (
                <TopicEditer id={topic._id} />
              )}
            </div>
          ) : events && events.length > 0 ? (
            events.map(event => (
              <div className={"one-topic"}>
                <div className={"title"}>
                  <span className={`event-status ${event.active ? "active" : ""}`} />
                  {this.timestamp(event.date)}
                </div>

                <TopicDropdown subscribers={event.participants} />
                <span>Place: </span>
                <div>{topic.address}</div>
                <span>Time:</span>
                <div>{topic.time}</div>
                <button style={{ visibility: "hidden" }} />
              </div>
            ))
          ) : (
            <div className="no-topic-events">There are no events for this topic.</div>
          )}
        </main>
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
