import React, { Component } from "react";
import styles from "./styles.module.scss";
import SectionInfo from "../../modules/SectionInfo";
import Button from "../../modules/Button";
import TelegramLoginButton from "../../helpers/TelegramLoginButton";
import axios from "axios";
import PageTitle from "../../modules/PageTitle";

class SectionMain extends Component {
  render() {
    const handleTelegramResponse = response => {
      // alert(
      //   "You shall not pass:\n" +
      //     "auth_date: " +
      //     response.auth_date +
      //     "\n" +
      //     "first_name: " +
      //     response.first_name +
      //     "\n" +
      //     "id: " +
      //     response.id +
      //     "\n" +
      //     "last_name: " +
      //     response.last_name +
      //     "\n" +
      //     "last_name: " +
      //     response.username,
      // );

      const myInit = {
        method: "PUT",
        mode: "cors",
        body: { user: response },
        cache: "default",
      };

      axios(
        "https://forge-development.herokuapp.com/auth/telegram/callback",
        myInit,
      )
        .then(r => {
          // console.log("response: ");
          console.log(r);
          return r;
          // return r.json()
        })
        .then(data => {
          return data;
          console.log(data);
          // console.log(data.json());
        });
      // console.log(this.props
      let { logInClick } = this.props;
      setDataToStorage(response);
      logInClick();
      // console.log(localStorage);
    };

    const setDataToStorage = response => {
      const {
        id,
        auth_date,
        first_name,
        last_name,
        username,
        photo_url,
      } = response;
      localStorage.setItem("telegramID", id);
      localStorage.setItem("firstName", first_name);
      localStorage.setItem("lastName", last_name);
      localStorage.setItem("authDate", auth_date);
      localStorage.setItem("userName", username);
      localStorage.setItem("photoUrl", photo_url);
    };

    const text = "logout";
    const { isActive, logOutClick } = this.props;
    const infoText = isActive
      ? "Select your team to start knowledge sharing and having some coffee:"
      : "Use Telegram to be aware of upcoming meets and manage subscriptions:";
    return (
      <div className={`${styles.wrapper} ${styles.section__center}`}>
        <SectionInfo infoText={infoText} />
        <div id={styles.telegram__login__container} className={styles.section}>
          {isActive ? (
            <Button text={text} onClick={logOutClick} />
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
