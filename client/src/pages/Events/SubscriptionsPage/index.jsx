import React, { Component } from "react";
import Header from "../../../common/Header";
import EventDesc from "../../../events/components/EventDesc";
import { getCookie } from "tiny-cookie";
import { Switch, Route } from "react-router-dom";
import TopicFront from "../TopicFront";
import Preloader from "../../../modules/Preloader";
import {
  getAllTopics,
  getAllUserSubscriptions,
  getUser,
  subscribeUserToTopic,
  unsubsrcibeUserFromTopic,
} from "../helpers.js";

class SubscriptionsPage extends Component {
  constructor(props) {
    super(props);
    this.updateTopicsIds = this.updateTopicsIds.bind(this);
  }

  state = {
    topics: [],
    userData: {},
    userTopics: [],
    userTopicsIds: [],
    isUserDataLoaded: false,
    currentLoadingEvents: [],
    loadingData: true,
    varCurrentPage: [],
    pageCount: [],
  };

  token = getCookie("token");
  userId = sessionStorage.getItem("id");

  //=========== for <BUTTON> subsribe ===========//

  handleSubscriptionClick = topicId => {
    this.handleSubscribing(topicId, subscribeUserToTopic);
    this.setState({ userTopicsIds: [...this.state.userTopicsIds, topicId] });
  };

  handleUnsubscriptionClick = topicId => {
    this.handleSubscribing(topicId, unsubsrcibeUserFromTopic);
    this.setState({ userTopicsIds: this.state.userTopicsIds.filter(id => id !== topicId) });
  };

  handleSubscribing = async (topicId, subscribingFunction) => {
    this.setState({ currentLoadingEvents: [...this.state.currentLoadingEvents, topicId] });
    const result = await subscribingFunction(topicId, this.userId, this.token);
    await this.setState({
      UserData: result.data.data,
      currentLoadingEvents: this.state.currentLoadingEvents.filter(
        loadingEventId => loadingEventId !== topicId,
      ),
    });
  };

  //=========== end <BUTTON> subsribe ===========//

  pagination = async currentPage => {
    const AllTopics = await getAllTopics(this.token, currentPage - 1);
    this.setState({
      topics: AllTopics.data.data,
      varCurrentPage: currentPage,
    });
  };

  EventFull = () => (
    <EventDesc
      className="event"
      events={this.state.topics}
      userEventsIds={this.state.userTopicsIds}
      onSubscriptionClick={topicId => this.handleSubscriptionClick(topicId)}
      onUnsubscriptionClick={topicId => this.handleUnsubscriptionClick(topicId)}
      isLoading={!this.state.isUserDataLoaded}
      currentLoadingEvents={this.state.currentLoadingEvents}
      pageCount={this.state.pageCount}
      currentPage={this.state.varCurrentPage}
      pagination={currentPage => this.pagination(currentPage)}
    />
  );

  async updateTopicsIds() {
    const AllUserSubscriptions = await getAllUserSubscriptions(this.token, this.userId);
    this.setState({
      userTopics: AllUserSubscriptions.data.data,
      userTopicsIds: AllUserSubscriptions.data.data.map(event => event.topicId),
    });
  }

  async componentWillMount() {
    const AllUserSubscriptions = await getAllUserSubscriptions(this.token, this.userId);
    const User = await getUser(this.token, this.userId);
    const AllTopics = await getAllTopics(this.token);
    this.setState({
      userData: User.data.data,
      topics: AllTopics.data.data,
      pageCount: AllTopics.data.pages.total,
      userTopics: AllUserSubscriptions.data.data,
      userTopicsIds: AllUserSubscriptions.data.data.map(event => event.topicId),
      isUserDataLoaded: true,
      loadingData: false,
      varCurrentPage: 1,
    });
  }
  render() {
    if (this.state.loadingData) {
      return (
        <div className="preloader-body">
          <Preloader />
        </div>
      );
    }

    return (
      <>
        <Header
          isActive={true}
          isAdmin={sessionStorage.getItem("isAdmin")}
          hasDepartment={true}
          avatar={sessionStorage.getItem("avatar")}
          name={sessionStorage.getItem("firstName")}
          surName={sessionStorage.getItem("lastName")}
          location={this.props}
        />
        <main>
          <Switch>
            <Route exact path="/subscriptions/" component={this.EventFull} />
            <Route
              path="/subscriptions/:id"
              component={params => <TopicFront userEventsIds={this.updateTopicsIds} {...params} />}
            />
          </Switch>
        </main>
      </>
    );
  }
}

export default SubscriptionsPage;
