import React, { Component } from "react";
import styles from "./styles.module.scss";
import SectionInfo from "../../modules/SectionInfo";
import Button from "../../modules/Button";
import PageTitle from "../../modules/PageTitle";

class SectionMain extends Component {
  render() {
    return (
      <main>
        <PageTitle title="Get your own kick off" desc="with Wargaming S&C" />
        <div className={`${styles.wrapper} ${styles.section__center}`}>
          <SectionInfo infoText="Use Telegram to be aware of upcoming meets and manage subscriptions:" />
          <Button
            link={
              "https://forge-development.herokuapp.com/auth/telegram?callback=" +
              window.location.origin
            }
            text="Log in via Telegram"
          />
        </div>
      </main>
    );
  }
}

export default SectionMain;
