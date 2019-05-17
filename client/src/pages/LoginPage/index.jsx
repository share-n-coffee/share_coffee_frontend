import React, { Component } from "react";
import Header from "./../../components/Header";
import PageTitle from "../../modules/PageTitle";
import Footer from "../../modules/Footer";
import SectionMain from "../SectionMain";

export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
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
          <PageTitle
            title={`Hello, ${name} ${surName}`}
            desc="feel free at this website"
          />
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
