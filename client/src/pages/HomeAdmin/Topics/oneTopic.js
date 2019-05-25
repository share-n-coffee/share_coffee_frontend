import React, { Component } from "react";
import PropTypes from "prop-types";
import TopicEditer from "./topicEditer";
import { Tab, TabContainer } from "../../../ui/core/home";
import PageTitle from "../../../modules/PageTitle";
import requests from "../../../helpers/requests";
import Button from "../../../common/Button";
import Header from "../../../common/Header";

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
    const requestUrl = `https://forge-development.herokuapp.com/api/events/${
      this.props.match.params.id
    }`;

    requests.get(requestUrl).then(data => {
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
                <p>{event.description}</p>
                <Button onClick={this.showEditForm} text="Edit" type="Subscribe" />
              </div>
            ) : (
              <TopicEditer id={event._id} />
            )}
          </div>
        ) : (
          <div>All events</div>
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
