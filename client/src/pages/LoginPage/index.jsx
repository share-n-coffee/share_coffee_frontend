import React, { Component } from "react";
import Header from "../../common/Header";
import { Link } from "react-router-dom";
import PageTitle from "../../modules/PageTitle";
import PageTeamSelect from "../PageTeamSelect";
import Footer from "../../common/Footer";
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
    return (
      <div>
        {/*<Header />*/}
        {isActive ? (
          <PageTeamSelect />
        ) : (
          <PageTitle title="Get your own kick off" desc="with Wargaming S&C" />
        )}
        <SectionMain isActive={isActive} logIO={logIO} />
      </div>
    );
  }
}
