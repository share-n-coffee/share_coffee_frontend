import React, { Component } from "react";
import InfoAboutEvent from "../../modules/InfoAboutEvent";
import TopicFront from "../../../pages/TopicFront";
import EventName from "../../modules/EventName";
import Button from "../../../common/Button";

import styles from "./styles.module.scss";

class EventDesc extends Component {
  state = {
    idEvent: "",
    openEvent: false,
  };
  openEvent(id) {
    return async () => {
      await this.setState({ idEvent: id });
      await this.setState({ openEvent: true });
      this.forceUpdate();
      console.log(this.state);
    };
  }

  render() {
    const { events } = this.props;
    const elements = events.map(item => {
      const { ...itemProps } = item;
      return (
        <div key={itemProps._id} className={styles.eventDescItem}>
          <div
            className={styles.eventContainer}
            onClick={this.openEvent(itemProps._id)}
          >
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

    return this.state.openEvent ? (
      <TopicFront id={this.state.idEvent} />
    ) : (
      <div className={styles.eventDesc}>{elements}</div>
    );
  }
}

export default EventDesc;
