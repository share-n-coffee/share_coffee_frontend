import React, { Component } from "react";
import EventMap from "../../../events/components/EventMap";
import { getCookie } from "tiny-cookie";
import PageTitle from "../../../modules/PageTitle";
import SpinButton from "../../../common/SpinButton";
import Button from "../../../common/Button";
import parser from "html-react-parser";
import Preloader from "../../../modules/Preloader";

import {
  subscribeUserToTopic,
  unsubsrcibeUserFromTopic,
  getDataEvent,
  getSubscription,
} from "../helpers.js";

import {
  //mapChecker,
  letterTransform,
  regularity,
  timeConverter,
  checkerProp,
} from "../../../helpers/helpers";

class TopicFront extends Component {
  state = {
    linkHover: false,
    eventData: {},
    loading: true,
    isSubscribed: false,
    currentLoadingEvents: [],
  };

  userId = sessionStorage.getItem("id");
  token = getCookie("token");

  //=========== for <BUTTON> subsribe ===========//

  handleSubscriptionClick = topicId => {
    this.handleSubscribing(topicId, subscribeUserToTopic);
  };

  handleUnsubscriptionClick = topicId => {
    this.handleSubscribing(topicId, unsubsrcibeUserFromTopic);
  };

  handleSubscribing = async (topicId, subscribingFunction) => {
    this.setState({
      isSubscribed: !this.state.isSubscribed,
      currentLoadingEvents: [...this.state.currentLoadingEvents, topicId],
    });
    await subscribingFunction(topicId, this.userId, this.token);
    await this.setState({
      currentLoadingEvents: this.state.currentLoadingEvents.filter(
        loadingEventId => loadingEventId !== topicId,
      ),
    });
  };

  //=========== end <BUTTON> subsribe ===========//

  mouseEvents = {
    mouseOver: () => {
      this.setState({ linkHover: true });
    },
    mouseOut: () => {
      this.setState({ linkHover: false });
    },
    click: () => {
      this.props.userEventsIds();
      this.props.history.goBack();
    },
  };

  toEdit = () => {
    this.props.history.push(`/admin/topic-create/${this.userId}`);
  };

  async componentWillMount() {
    const topicId = this.props.match.params.id;
    const eventDataReq = await getDataEvent(topicId, this.token);
    const all = await getSubscription(topicId, this.userId, this.token);
    this.setState({
      eventData: eventDataReq.data[0],
      loading: false,
      isSubscribed: !!all.data.data[0],
    });
  }

  render() {
    const { isLoading, isAdmin } = this.props;

    if (this.state.loading) {
      return (
        <div className="preloader-body">
          <Preloader />
        </div>
      );
    }
    return (
      <>
        {!isAdmin ? (
          <PageTitle
            title={
              !this.state.linkHover
                ? `${
                    checkerProp(this.state.eventData.title)
                      ? "Default title"
                      : this.state.eventData.title
                  }`
                : // letterTransform(checkerNone(this.state.eventData.title))
                  "← Back"
            }
            mouseOver={this.mouseEvents.mouseOver}
            mouseOut={this.mouseEvents.mouseOut}
            click={this.mouseEvents.click}
          />
        ) : (
          ""
        )}
        <div className="topic-wrapper">
          <div className="map-section_container">
            <div className="section_header">
              <h2>
                Topic "
                {checkerProp(this.state.eventData.title)
                  ? "Default title"
                  : letterTransform(this.state.eventData.title)
                // letterTransform(checkerNone(this.state.eventData.title))
                }
                "
              </h2>
              {isAdmin ? (
                <Button text={"Edit"} onClick={this.toEdit} />
              ) : (
                <SpinButton
                  text={this.state.isSubscribed ? "Unsubscribe" : "Subscribe"}
                  type={this.state.isSubscribed ? "Unsubscribe" : "Subscribe"}
                  isLoading={
                    isLoading ||
                    this.state.currentLoadingEvents.includes(this.props.match.params.id)
                  }
                  disabled={!this.state.eventData.active}
                  onClick={() => {
                    if (this.state.isSubscribed) {
                      this.handleUnsubscriptionClick(this.props.match.params.id);
                    } else {
                      this.handleSubscriptionClick(this.props.match.params.id);
                    }
                  }}
                />
              )}
            </div>
            <p className="section__descr">
              {parser(
                checkerProp(this.state.eventData.description)
                  ? "Default description"
                  : this.state.eventData.description,
                // checkerNone(this.state.eventData.description)
              )}
            </p>
            <div className="section__place">
              <h3 className="section__topic__title">Place:</h3>
              <p className="place__descr">
                {checkerProp(this.state.eventData.address)
                  ? "Default address"
                  : this.state.eventData.address
                // letterTransform(checkerNone(this.state.eventData.address))
                }
              </p>
            </div>
            <div className="time__descr">
              <h3 className="section__topic__title">Time:</h3>
              <p className="time__descr">
                {this.state.eventData.cyclic
                  ? `Every ${regularity[this.state.eventData.weekDay]}, ${
                      checkerProp(this.state.eventData.time)
                        ? "Default time"
                        : this.state.eventData.time
                      // checkerNone(this.state.eventData.time)
                    }`
                  : `${
                      checkerProp(this.state.eventData.singleDate)
                        ? "Default singleDate"
                        : timeConverter(this.state.eventData.singleDate)
                    } - ${
                      checkerProp(this.state.eventData.time)
                        ? "Default time"
                        : this.state.eventData.time
                      // checkerNone(this.state.eventData.time)
                    }`}
              </p>
            </div>
            <div className="map__descr">
              <h3 className="section__topic__title">Map:</h3>
              {!checkerProp(this.state.eventData.location) ? (
                this.state.eventData.location.length === 2 ? (
                  <EventMap location={this.state.eventData.location} />
                ) : (
                  "no coord"
                )
              ) : (
                <span>Map is not ready</span>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default TopicFront;
