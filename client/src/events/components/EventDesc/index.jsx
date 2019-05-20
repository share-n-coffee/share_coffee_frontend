import React, { Component } from "react";
import InfoAboutEvent from "../../modules/InfoAboutEvent";
import EventName from "../../modules/EventName";
import Button from "../../../common/Button";

import styles from "./styles.module.scss";

class EventDesc extends Component {
  render() {
    const { events } = this.props;
    const elements = events.map(item => {
      const { ...itemProps } = item;

      return (
        <div key={itemProps.key} className={styles.eventDescItem}>
          <div className={styles.eventContainer}>
            <EventName
              eventName={itemProps.title}
              isSubscribed={itemProps.isActive}
            />
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

    return <div className={styles.eventDesc}>{elements}</div>;
  }
}

export default EventDesc;
