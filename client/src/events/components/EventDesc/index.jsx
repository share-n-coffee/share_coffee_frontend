import React, { Component } from "react";
import InfoAboutEvent from "../../modules/InfoAboutEvent";
import PageTitle from "../../../modules/PageTitle";
import EventName from "../../modules/EventName";
import Button from "../../../common/Button";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

class EventDesc extends Component {
  render() {
    const { events } = this.props;

    const elements = events.map(item => {
      const { ...itemProps } = item;
      return (
        <div key={itemProps._id} className={styles.eventDescItem}>
          <div className={styles.eventContainer}>
            <Link to={{ pathname: `/subscriptions/${itemProps._id}` }}>
              <EventName eventName={itemProps.title} isSubscribed={itemProps.isActive} />
            </Link>

            <InfoAboutEvent
              adress={itemProps.address}
              eventFrequency={new Date(itemProps.created).toDateString()}
            />
          </div>
          <Button
            text={itemProps.events ? "Unsubscribe" : "Subscribe"}
            type={itemProps.events ? "Unsubscribe" : "Subscribe"}
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
