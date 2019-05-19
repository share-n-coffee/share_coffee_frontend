import React, { Component } from "react";
import Header from "../../modules/Header";
import PageTitle from "../../modules/PageTitle";
import Footer from "../../modules/Footer";
import SectionMain from "../SectionMain";
import { testUser1, testUser } from "../../testData";

export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
    };
  }

  render() {
    const logIO = () => {
      this.setState(state => {
        return {
          isActive: !state.isActive,
        };
      });
    };

    const testClickHandlerLogin = () => {
      let data = testUser1;
      localStorage.setItem("id", data._id);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);
      localStorage.setItem("avatar", data.avatar);
      localStorage.setItem("banned", data.banned);
      localStorage.setItem("isAdmin", data.isAdmin);
      localStorage.setItem("Department", data.Department);
      localStorage.setItem("tokenTimeOver", data.tokenTimeOver);
      localStorage.setItem("tokenTimeStart", data.tokenTimeStart);
      console.log(localStorage);
      logIO();
    };

    const isActive = this.state.isActive;
    // const name = localStorage.getItem("firstName");
    // const surName = localStorage.getItem("lastName");
    return (
      <div>
        <Header />
        {/*{isActive ? (*/}
        {/*<PageTitle title={`Hello, ${name} ${surName}`} />*/}
        {/*) : (*/}
        {/*<PageTitle title="Get your own kick off" desc="with Wargaming S&C" />*/}
        {/*)}*/}
        <SectionMain
          isActive={isActive}
          logIO={logIO}
          testClickHandlerLogin={testClickHandlerLogin}
        />
        <Footer />
      </div>
    );
  }
}
