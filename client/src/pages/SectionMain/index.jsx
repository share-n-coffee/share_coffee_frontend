import React, { Component, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import SectionInfo from "../../modules/SectionInfo";
import Button from "../../common/Button";
import TelegramLoginButton from "../../helpers/TelegramLoginButton";
import axios from "axios";
import URL_LOGIN from "../../constants";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

class SectionMain extends Component {
  state = {
    hasDepartament: false,
  };

  componentDidMount() {
    const id = sessionStorage.getItem("id");
    if (id) {
      axios({
        method: "get",
        url: `https://forge-development.herokuapp.com/api/users/${id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then(res => {
          console.log(res);
          if (res.data.department) {
            console.log(true);
            this.setState({ hasDepartament: true });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

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
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id", userData.data._id);
      sessionStorage.setItem("firstName", userData.data.firstName);
      sessionStorage.setItem("lastName", userData.data.lastName);
      sessionStorage.setItem("avatar", userData.data.avatar);
      sessionStorage.setItem("isAdmin", userData.data.isAdmin);
      sessionStorage.setItem("banned", userData.data.banned.status);
      sessionStorage.setItem("Department", userData.data.Department);
      sessionStorage.setItem("tokenTimeOver", userData.exp);
      sessionStorage.setItem("tokenTimeStart", userData.iat);
      const { logIO } = this.props;
      logIO();
    };

    const { isActive, logIO } = this.props;
    const infoText = isActive
      ? "Select your team to start knowledge sharing and having some coffee:"
      : "Use Telegram to be aware of upcoming meets and manage subscriptions:";
    return (
      <>
        <SectionInfo infoText={infoText} />
        <div id={styles.telegram__login__container} className={styles.section}>
          {this.state.hasDepartament ? (
            <Button
              text={
                <Link to="/subscriptions">{`Log in as ${sessionStorage.getItem(
                  "firstName",
                )}`}</Link>
              }
              handlerClick={logIO}
            />
          ) : (
            <TelegramLoginButton
              dataOnauth={handleTelegramResponse}
              botName="rdmcoffee_bot"
              requestAccess="write"
              buttonSize="large"
              cornerRadius={20}
              usePic={false}
            />
          )}
        </div>
      </>
    );
  }
}

export default SectionMain;
