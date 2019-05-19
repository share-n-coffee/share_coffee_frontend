import React, { Component } from "react";

import styles from "./styles.module.scss";

class EventName extends Component {
  render() {
    const { eventName, isSubscribed } = this.props;

    return (
      <>
        <div className={styles.eventName}>{eventName}</div>
        {isSubscribed && <span>Subscribed</span>}
      </>
    );
  }
}
export default EventName;
