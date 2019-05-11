import React, {Component} from "react";
import './SectionMain.css';
import SectionInfo from "../SectionInfo/SectionInfo";
import Button from "../Button/Button";

class SectionMain extends Component {
  render() {
    return <div className="wrapper section__center">
      <SectionInfo infoText="Use Telegram to be aware of upcoming meets and manage subscriptions:" />
      <Button
        link="https://forgeserver.herokuapp.com//auth/telegram"
        text="Log in via Telegram"
      />
    </div>;
  }
}

export default SectionMain;
