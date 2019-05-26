import React, { Component } from "react";
import styles from "./styles.module.scss";
import LoginPage from "../pages/LoginPage";
import PageTeamSelect from "../pages/PageTeamSelect";
import SubscriptionsPage from "../pages/SubscriptionsPage";
import HomeAdmin from "../pages/HomeAdmin";
import OneTopic from "../pages/HomeAdmin/Topics/oneTopic";
import OneUser from "../pages/HomeAdmin/Users/oneUser";
import { setCookie } from "tiny-cookie"; //for localhost
import { HashRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import Footer from "../common/Footer";
import NotFound from "../pages/not-found/NotFound";
import TopicCreate from "../pages/HomeAdmin/Topics/topicCreate";

export default class App extends Component {
  render() {
    setCookie(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVjZTFjYTE2OGMwZjQzMDAxZTZlODg5NyIsImZpcnN0TmFtZSI6IkJhaHVzIiwibGFzdE5hbWUiOiJFTiIsImRlcGFydG1lbnQiOiI1Y2UyYzViNzA0ZTg1ZDAwMWUwZWI5MjEiLCJhdmF0YXIiOiJodHRwczovL3QubWUvaS91c2VycGljLzMyMC9DWEJhaHVzLmpwZyIsImJhbm5lZCI6eyJzdGF0dXMiOmZhbHNlLCJleHBpcmVkIjowfSwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU1ODc5NzE3MiwiZXhwIjoxNTU5NDAxOTcyfQ.qrcN3uduqyCtaLQd8EwE6EoLucBnMAYpNHYNb7iZIM4",
    ); //for localhost
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
