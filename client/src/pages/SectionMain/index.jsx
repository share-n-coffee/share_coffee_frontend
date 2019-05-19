import React, { Component } from "react";
import styles from "./styles.module.scss";
import SectionInfo from "../../modules/SectionInfo";
import Button from "../../modules/Button";
import TelegramLoginButton from "../../helpers/TelegramLoginButton";
import axios from "axios";
import URL_LOGIN from "../../constants";
import jwtDecode from "jwt-decode";

class SectionMain extends Component {
  render() {
    const handleTelegramResponse = telegramResponse => {
      const requestObj = {
        method: "put",
        url: URL_LOGIN,
        data: telegramResponse,
      };
      axios(requestObj)
        .then(response => {
          let userData = jwtDecode(`${response.data.token}`);
          setDataToStorage(userData);
          return response;
        })
        .catch(err => console.log(err));
      const { logIO } = this.props;
      logIO();
    };

    const setDataToStorage = res => {
      localStorage.setItem("id", res.data._id);
      localStorage.setItem("firstName", res.data.firstName);
      localStorage.setItem("lastName", res.data.lastName);
      localStorage.setItem("avatar", res.data.avatar);
      localStorage.setItem("isAdmin", res.data.isAdmin);
      localStorage.setItem("banned", res.data.banned);
      localStorage.setItem("Department", res.data.Department);
      localStorage.setItem("tokenTimeOver", res.exp);
      localStorage.setItem("tokenTimeStart", res.iat);
      localStorage.setItem("created", res.data.created);
    };

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
            <Button text={"logout"} handlerClick={logIO} />
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
