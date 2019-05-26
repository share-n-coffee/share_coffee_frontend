import React, { Component } from "react";

class EventName extends Component {
  render() {
    const { eventName, isSubscribed } = this.props;

    return (
      <>
        <div className="eventName">{eventName}</div>
        {isSubscribed && <span>Subscribed</span>}
      </>
    );
  }
}
export default EventName;
