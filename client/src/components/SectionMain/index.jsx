import React, { Component } from "react";
import styles from "./styles.module.scss";
import SectionInfo from "../SectionInfo";
import Button from "../Button";

class SectionMain extends Component {
  render() {
    return (
      <div className={`${styles.wrapper} ${styles.section__center}`}>
        <SectionInfo infoText="Use Telegram to be aware of upcoming meets and manage subscriptions:" />
        <Button
          link="https://forgeserver.herokuapp.com/auth/telegram"
          text="Log in via Telegram"
        />
      </div>
    );
  }
}

export default SectionMain;
