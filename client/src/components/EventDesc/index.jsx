import React, { Component } from "react";
import InfoAboutEvent from "../InfoAboutEvent";
import EventName from "../EventName";
import Button from "../Button";

import styles from "./styles.module.scss";

class EventDesc extends Component {
  render() {
    const { eventName, adress, eventFrequency, text } = this.props;

    return (
      <div className={styles.eventDesc}>
        <EventName eventName={eventName} />
        <InfoAboutEvent adress={adress} eventFrequency={eventFrequency} />
        <Button text={text} />
      </div>
    );
  }
}

export default EventDesc;
