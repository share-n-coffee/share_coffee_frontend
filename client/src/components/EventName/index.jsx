import React, { Component } from "react";

import styles from "./styles.module.scss";

class EventName extends Component {
  render() {
    const {eventName} = this.props;

    return <div className={styles.eventName}>{eventName}</div>;
  }
}
export default EventName;
