import React, { Component } from "react";
import styles from "./styles.module.scss";

class SectionInfo extends Component {
  render() {
    const { infoText } = this.props;

    return (
      <div className={styles.section__info}>
        <span>{infoText}</span>
      </div>
    );
  }
}

export default SectionInfo;
