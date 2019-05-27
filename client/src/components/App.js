import React, { Component } from "react";
import styles from "./styles.module.scss";
import LoginPage from "../pages/LoginPage";
import PageTeamSelect from "../pages/PageTeamSelect";
import SubscriptionsPage from "../pages/SubscriptionsPage";
import HomeAdmin from "../pages/HomeAdmin";
import OneTopic from "../pages/HomeAdmin/Topics/oneTopic";
import OneUser from "../pages/HomeAdmin/Users/oneUser";
// import { setCookie } from "tiny-cookie"; //for localhost
import { getCookie } from "tiny-cookie";
import { HashRouter as Router } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import Footer from "../common/Footer";
import NotFound from "../pages/not-found/NotFound";
import TopicCreate from "../pages/HomeAdmin/Topics/topicCreate";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.userAuth = this.userAuth.bind(this);
  }

  state = {
    id: sessionStorage.getItem("id"),
    token: getCookie("token"),
  };

  userAuth() {
    this.setState({
      id: sessionStorage.getItem("id"),
      token: getCookie("token"),
    });
  }

  render() {
    // setCookie(
    //   "token",
    //   "",
    // ); //for localhost
    // sessionStorage.setItem("id", "122248863");
    // sessionStorage.setItem("firstName", "gadya");
    // sessionStorage.setItem("lastName", "xrenova");
    // sessionStorage.setItem("avatar", "undefined");
    // sessionStorage.setItem("isAdmin", true);
    // sessionStorage.setItem("banned", false);
    // sessionStorage.setItem("department", "magistral");
    // sessionStorage.setItem("tokenTimeOver", "15134868");

    //if no info about user
    if (!this.state.id && !this.state.token) {
      return (
        <div className={`${styles.App} ${styles.wrapper}`}>
          <Switch>
            <Route
              path="/"
              render={props => <LoginPage userAuth={this.userAuth} {...props} />}
              exact
            />
            <Redirect to="/" />
          </Switch>
        </div>
      );
    }

    return (
      <div className={`${styles.App} ${styles.wrapper}`}>
        <Router>
          <Switch>
            <Route
              path="/"
              render={props => <LoginPage userAuth={this.userAuth} {...props} />}
              exact
            />
            <Route path="/team_select/" component={PageTeamSelect} exact />
            <Route path="/subscriptions/" component={SubscriptionsPage} />
            <Route path="/admin" component={HomeAdmin} exact />
            <Route path="/admin/topic/:id" component={OneTopic} exact />
            <Route path="/admin/topic-create" component={TopicCreate} exact />
            <Route path="/admin/user/:id" component={OneUser} exact />
            <Route component={NotFound} exact />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}
