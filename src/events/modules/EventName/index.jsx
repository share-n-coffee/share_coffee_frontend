import React, { Component } from "react";

class EventName extends Component {
  render() {
    const { eventName } = this.props;

    return (
      <>
        <div className="eventName">{eventName}</div>
      </>
    );
  }
}
export default EventName;
