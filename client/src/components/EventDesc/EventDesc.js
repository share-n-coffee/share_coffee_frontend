import React, { Component } from "react";
import InfoAboutEvent from "../InfoAboutEvent";
import EventName from "../EventName";
import Button from "../Button/Button";

import "./EventDesc.css";

export default class EventDesc extends Component {
  render() {
    const { eventName, adress, eventFrequency, text } = this.props;

    return (
      <div className="eventDesc wrapper">
        <EventName eventName={eventName} />
        <InfoAboutEvent adress={adress} eventFrequency={eventFrequency} />
        <Button text={text} />
      </div>
    );
  }
}
