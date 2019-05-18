import React, { Component } from "react";
import Header from "../../modules/Header";
import PageTitle from "../../modules/PageTitle";
import Footer from "../../modules/Footer";
import SectionMain from "../SectionMain";
import Dropdown from "../../components/Dropdown";

export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      //check  if user login
      isActive: false,
    };
  }

  render() {
    const logOutHandler = () => {
      // console.log("logout work:");
      // console.log("state changed");
      this.setState(() => {
        return {
          isActive: false,
        };
      });
      // console.log("storage cleared");
      localStorage.clear();
      // console.log(localStorage);
    };

    const logInHandler = () => {
      // console.log("login work");
      // console.log("state changed");
      // console.log(localStorage.getItem("telegramID"));
      this.setState(() => {
        return {
          isActive: true,
        };
      });
      // console.log(localStorage);
    };

    // let isActive = this.state.userTelegramID === null ? false : true;
    const isActive = this.state.isActive;
    const name = localStorage.getItem("firstName");
    const surName = localStorage.getItem("lastName");
    return (
      <div>
        <Header />
        {isActive ? (
          <PageTitle title={`Hello, ${name} ${surName}`} />
        ) : (
          <PageTitle title="Get your own kick off" desc="with Wargaming S&C" />
        )}
        <SectionMain
          isActive={isActive}
          logInClick={logInHandler}
          logOutClick={logOutHandler}
        />
        <Footer />
      </div>
    );
  }
}
