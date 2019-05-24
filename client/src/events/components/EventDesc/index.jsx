import React, { Component } from "react";
import InfoAboutEvent from "../../modules/InfoAboutEvent";
import PageTitle from "../../../modules/PageTitle";
import EventName from "../../modules/EventName";
import Button from "../../../common/Button";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

class EventDesc extends Component {
  render() {
    const { events, onSubscriptionClick, onUnsubscriptionClick, userEvents = [] } = this.props;
    const userEventIds = userEvents.map(event => event.eventId);

    const elements = events.map(event => {
      const isSubscribed = userEventIds.includes(event._id);
      return (
        <div key={event._id} className={styles.eventDescItem}>
          <div className={styles.eventContainer}>
            <Link to={{ pathname: `/subscriptions/${event._id}` }}>
              <EventName eventName={event.title} isSubscribed={event.isActive} />
            </Link>

            <InfoAboutEvent
              adress={event.address}
              eventFrequency={new Date(event.created).toDateString()}
            />
          </div>
          <Button
            text={isSubscribed ? "Unsubscribe" : "Subscribe"}
            type={isSubscribed ? "Unsubscribe" : "Subscribe"}
            onClick={() => {
              if (isSubscribed) {
                onUnsubscriptionClick(event._id);
              } else {
                onSubscriptionClick(event._id);
              }
            }}
          />
        </div>
      );
    });
    return (
      <>
        <PageTitle title="Current topics" />
        <div className={styles.eventDesc}>{elements}</div>
      </>
    );
  }
}

export default EventDesc;
