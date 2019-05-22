import React, { Component } from "react";
import PageTitle from "../../modules/PageTitle";
import styles from "./styles.module.scss";
import TelegramLoginButton from "../../helpers/TelegramLoginButton";
import SectionInfo from "../../modules/SectionInfo";
import { setCookie } from "tiny-cookie";
import axios from "axios";
import URL_LOGIN from "../../constants";
import jwtDecode from "jwt-decode";
import { setStorage, router } from "../../helpers/helpers";

export default class LoginPage extends Component {
  render() {
    const handleTelegramResponse = async telegramResponse => {
      const requestObj = {
        method: "put",
        url: URL_LOGIN,
        data: telegramResponse,
      };

      const token = await axios(requestObj)
        .then(response => {
          return response.data.token;
        })
        .catch(err => console.log(err));

      const userData = jwtDecode(`${token}`);
      const date = new Date(userData.exp * 1000).toGMTString();
      setCookie("token", token, { expires: date });

      //from helpers.js
      await setStorage(token, userData);
      router(this.props);
    };
    return (
      <>
        <PageTitle title="Get your own kick off" desc="with Wargaming S&C" />
        <SectionInfo infoText="Use Telegram to be aware of upcoming meets and manage subscriptions:" />
        <div
          id={styles.telegram__login__container}
          className={styles.section}
          onClick={this.update}
        >
          <TelegramLoginButton
            dataOnauth={handleTelegramResponse}
            botName="rdmcoffee_bot"
            requestAccess="write"
            buttonSize="large"
            cornerRadius={20}
            usePic={false}
          />
        </div>
      </>
    );
  }
}
