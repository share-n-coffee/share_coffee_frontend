import React, { Component } from "react";
import styles from "./styles.module.scss";
import LoginPage from "../pages/LoginPage";
import PageTeamSelect from "../pages/PageTeamSelect";
import SubscriptionsPage from "../pages/SubscriptionsPage";
import HomeAdmin from "../pages/HomeAdmin";
import OneTopic from "../pages/HomeAdmin/Topics/oneTopic";
import OneUser from "../pages/HomeAdmin/Users/oneUser";
// import { setCookie } from "tiny-cookie"; //for localhost
import { HashRouter as Router, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router";
import Footer from "../common/Footer";
import NotFound from "../pages/not-found/NotFound";
import TopicCreate from "../pages/HomeAdmin/Topics/topicCreate";
import { getCookie } from "tiny-cookie";

export default class App extends Component {
  render() {
    // setCookie("token", 'youToken');  //for localhost

    const id = sessionStorage.getItem("id");
    const token = getCookie("token");

    //if no info about user
    if (!(id && token)) {
      return (
        <div className={`${styles.App} ${styles.wrapper}`}>
          <Switch>
            <Route path="/" component={LoginPage} exact />
            <Redirect to="/" />
          </Switch>
        </div>
      );
    }

    return (
      <div className={`${styles.App} ${styles.wrapper}`}>
        <Router>
          <Switch>
            <Route path="/" component={LoginPage} exact />
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
