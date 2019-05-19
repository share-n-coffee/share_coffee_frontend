import React, { Component } from "react";
import Header from "../../modules/Header";
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
    const logIO = () => {
      this.setState(state => {
        return {
          isActive: !state.isActive,
        };
      });
    };

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
        <SectionMain isActive={isActive} logIO={logIO} />
        <Footer />
      </div>
    );
  }
}
