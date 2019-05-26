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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVjZTAxNTgyN2RjODI0MDAxZTBhYzczZSIsImZpcnN0TmFtZSI6Ik1heCIsImxhc3ROYW1lIjoiUmF6aG5vdiIsImRlcGFydG1lbnQiOiI1Y2Q2ZjZjMzgxMzcxZDI5N2FjYjJmZDAiLCJhdmF0YXIiOiJodHRwczovL3QubWUvaS91c2VycGljLzMyMC9NeG1NYXpvdnNreS5qcGciLCJiYW5uZWQiOnsic3RhdHVzIjp0cnVlLCJleHBpcmVkIjo0MTAyMzg5ODI4NTA1fSwiaXNBZG1pbiI6ZmFsc2V9LCJpYXQiOjE1NTgzNTI4OTksImV4cCI6MTU1ODk1NzY5OX0.mvcXUriYtWCvaxnejCTatksS97sakq5hekN5w_3Zvxw",
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
