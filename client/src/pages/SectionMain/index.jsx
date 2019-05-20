import React, { Component } from "react";
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
    const id = localStorage.getItem("id");
    if (id) {
      axios(`https://forge-development.herokuapp.com/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(res => {
          if (res.data.department) {
            this.setState({ hasDepartament: true });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  render() {
    const handleTelegramResponse = telegramResponse => {
      const requestObj = {
        method: "put",
        url: URL_LOGIN,
        data: telegramResponse,
      };
      axios(requestObj)
        .then(response => {
          return setDataToStorage(
            jwtDecode(`${response.data.token}`),
            response.data.token,
          );
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
          {this.state.hasDepartament ? (
            <Button
              text={
                <Link to="/subscriptions">{`Log in as ${localStorage.getItem(
                  "firstName",
                )}`}</Link>
              }
              handlerClick={logIO}
            />
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
