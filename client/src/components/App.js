import React, { Component } from "react";
import styles from "./styles.module.scss";
import LoginPage from "../pages/LoginPage";
import PageTeamSelect from "../pages/PageTeamSelect";
import SubscriptionsPage from "../pages/Events/SubscriptionsPage";
import HomeAdmin from "../pages/HomeAdmin/";
import OneTopic from "../pages/HomeAdmin/Topics/oneTopic";
import OneUser from "../pages/HomeAdmin/Users/oneUser";
//import { token } from "../constants";
import { setCookie } from "tiny-cookie"; //for localhost
import { getCookie } from "tiny-cookie";
import { HashRouter as Router } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import Footer from "../common/Footer";
import NotFound from "../pages/not-found/NotFound";
import TopicCreate from "../pages/HomeAdmin/Topics/topicCreate";

// LOCALHOST
// setCookie(
//   "token",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVjZWQ3NmU5OTE5M2M5YmI1NDZkNmFlMSIsImZpcnN0TmFtZSI6Ill1cnkiLCJsYXN0TmFtZSI6Ik1vbG9kb3YiLCJkZXBhcnRtZW50Ijp7Il9pZCI6IjVjZDZmNmMzODEzNzFkMjk3YWNiMmZkNCIsInRpdGxlIjoiRG9nc3BhIiwiZGVzY3JpcHRpb24iOiJMYWJvcnVtIHF1aXMgZW5pbSBhbWV0IGFkaXBpc2ljaW5nIGxhYm9ydW0gYWQgY29uc2VxdWF0IGF1dGUgZGVzZXJ1bnQgaXBzdW0gZXUuIExhYm9ydW0gZXhlcmNpdGF0aW9uIG1vbGxpdCBpbiBkdWlzIHNpbnQgYXV0ZSB0ZW1wb3IgbW9sbGl0IGFsaXF1YSBub3N0cnVkIGluIGlkIHRlbXBvci4gRXggbW9sbGl0IGNvbnNlY3RldHVyIGxhYm9ydW0gZXhjZXB0ZXVyIGFsaXF1aXAgaW5jaWRpZHVudCB2ZWxpdCBhbGlxdWlwIExvcmVtLiBTaW50IGxhYm9yaXMgZXUgYW1ldCBkbyBjb25zZWN0ZXR1ciByZXByZWhlbmRlcml0IGNvbW1vZG8gZG9sb3JlLiBEb2xvcmUgYWRpcGlzaWNpbmcgaWQgcGFyaWF0dXIgZGVzZXJ1bnQgZXQgY3VwaWRhdGF0IGNvbnNlcXVhdCBlc3Qgbm9zdHJ1ZCBhbGlxdWlwIGVhIGFsaXF1YS4gRXUgbWFnbmEgbGFib3J1bSB0ZW1wb3IgbmlzaSBpZCBhbWV0IHByb2lkZW50IGRvbG9yZSBjb21tb2RvIGNvbnNlY3RldHVyIGlwc3VtLiBMYWJvcmUgdWxsYW1jbyBzaW50IG5vbiBwcm9pZGVudCBleCBwcm9pZGVudCBxdWkgZXNzZSBsYWJvcmlzIGFsaXF1YS4ifSwiYXZhdGFyIjoiaHR0cHM6Ly90Lm1lL2kvdXNlcnBpYy8zMjAvTG9vcl9SLmpwZyIsImJhbm5lZCI6eyJzdGF0dXMiOmZhbHNlLCJleHBpcmVkIjowfSwicGVybWlzc2lvbiI6MH0sImlhdCI6MTU1OTE2NzM4OSwiZXhwIjoxNTU5NzcyMTg5fQ.BrKCMvit_8XNEgEryDEVvjuvmbkCWfrDwJNIWOfMtvE",
// ); //for localhost
// sessionStorage.setItem("id", "5cf0182d9193c9bb54992734");
// sessionStorage.setItem("firstName", "Yury");
// sessionStorage.setItem("lastName", "Molodov");
// sessionStorage.setItem("avatar", "https://t.me/i/userpic/320/Loor_R.jpg");
// sessionStorage.setItem("isAdmin", 2);
// sessionStorage.setItem("banned", false);
// sessionStorage.setItem("department", "Dogspa");
// sessionStorage.setItem("tokenTimeOver", "1559772189");
//------------------------------------------------

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
    //if no info about user
    if (!this.state.id || !this.state.token) {
      return (
        <div className={`${styles.App} ${styles.wrapper}`}>
          <Switch>
            <Route
              path="/"
              render={props => <LoginPage userAuth={this.userAuth} {...props} />}
              exact
            />
            <Route path="/admin" component={HomeAdmin} exact />

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
            <Route path="/404" component={NotFound} exact />
            <Route component={NotFound} exact />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}
