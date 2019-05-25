import React, { Component } from "react";

import styles from "./styles.module.scss";

class InfoAboutEvent extends Component {
  render() {
    const { adress, eventFrequency } = this.props;

    return (
      <div className={styles.infoAboutEvent}>
        <div className={styles.row}>
          <p className={styles.title}>Place:</p>
          <span>{adress}</span>
        </div>
        <div className={styles.row}>
          <p className={styles.title}>Time:</p>
          <span>{eventFrequency}</span>
        </div>
      </div>
    );
  }
}

export default InfoAboutEvent;
