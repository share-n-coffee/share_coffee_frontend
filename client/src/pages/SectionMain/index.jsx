import React, { Component } from "react";
import styles from "./styles.module.scss";
import SectionInfo from "../../modules/SectionInfo";
import Button from "../../modules/Button";
import TelegramLoginButton from "../../helpers/TelegramLoginButton";
import axios from "axios";
import URL from "../../constants";
import jwtDecode from "jwt-decode";

class SectionMain extends Component {
  render() {
    const handleTelegramResponse = telegramResponse => {
      const requestObj = {
        method: "put",
        url: URL,
        data: telegramResponse,
      };
      axios(requestObj)
        .then(response => {
          let userData = jwtDecode(`${response.data.token}`);
          console.dir(userData);
          setDataToStorage(userData);
          return response;
        })
        .catch(err => console.log(err));
      const { logIO } = this.props;
      logIO();
    };

    const setDataToStorage = res => {
      localStorage.setItem("telegramID", res.user.telegramUserId);
      localStorage.setItem("userName", res.user.username);
      localStorage.setItem("id", res.user._id);
      localStorage.setItem("firstName", res.user.firstName);
      localStorage.setItem("lastName", res.user.lastName);
      localStorage.setItem("avatar", res.user.avatar);
      localStorage.setItem("banned", res.user.banned);
      localStorage.setItem("Department", res.user.Department);
      localStorage.setItem("tokenTime", res.exp);
      localStorage.setItem("created", res.user.created);
    };

    const text = "logout";
    const { isActive, logIO } = this.props;
    const infoText = isActive
      ? "Select your team to start knowledge sharing and having some coffee:"
      : "Use Telegram to be aware of upcoming meets and manage subscriptions:";
    return (
      <div className={styles.wrapper}>
        <div className={`${styles.wrapper} ${styles.shadow_container}`} />
        <SectionInfo infoText={infoText} />
        <div id={styles.telegram__login__container} className={styles.section}>
          {isActive ? (
            <Button text={text} handlerClick={logIO} />
          ) : (
            <TelegramLoginButton
              dataOnauth={handleTelegramResponse}
              botName="RandomCofeeBot"
              requestAccess="write"
            />
          )}
        </div>
      </div>
    );
  }
}

export default SectionMain;
