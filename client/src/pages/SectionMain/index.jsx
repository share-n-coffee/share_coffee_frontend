import React, { Component } from "react";
import styles from "./styles.module.scss";
import SectionInfo from "../../modules/SectionInfo";
import Button from "../../common/Button";
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
          setDataToStorage(userData, response.data.token);
          return response;
        })
        .catch(err => console.log(err));
      const { logIO } = this.props;
      logIO();
    };

    const setDataToStorage = (userData, token) => {
      localStorage.setItem("token", token);
      localStorage.setItem("id", userData.data._id);
      localStorage.setItem("firstName", userData.data.firstName);
      localStorage.setItem("lastName", userData.data.lastName);
      localStorage.setItem("avatar", userData.data.avatar);
      localStorage.setItem("isAdmin", userData.data.isAdmin);
      localStorage.setItem("banned", userData.data.banned.status);
      localStorage.setItem("Department", userData.data.Department);
      localStorage.setItem("tokenTimeOver", userData.exp);
      localStorage.setItem("tokenTimeStart", userData.iat);
    };

    const { isActive, logIO } = this.props;
    const infoText = isActive
      ? "Select your team to start knowledge sharing and having some coffee:"
      : "Use Telegram to be aware of upcoming meets and manage subscriptions:";
    return (
      <>
        <SectionInfo infoText={infoText} />
        <div id={styles.telegram__login__container} className={styles.section}>
          {isActive ? (
            <Button text={"logout"} onClick={logIO} type="primary" />
          ) : (
            <TelegramLoginButton
              dataOnauth={handleTelegramResponse}
              botName="RandomCofeeBot"
              requestAccess="write"
            />
          )}
        </div>
      </>
    );
  }
}

export default SectionMain;
