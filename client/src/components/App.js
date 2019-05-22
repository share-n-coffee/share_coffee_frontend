import React, { Component, useContext } from "react";
import styles from "./styles.module.scss";
import LoginPage from "../pages/LoginPage";
import PageTeamSelect from "../pages/PageTeamSelect";
import SubscriptionsPage from "../pages/SubscriptionsPage";
import HomeAdmin from "../pages/HomeAdmin";
import OneTopic from "../pages/HomeAdmin/Topics/oneTopic";
// import UserDataContext from "../contexts/UserDataContext";
import Header from "../common/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import Footer from "../common/Footer";
import NotFound from "../pages/not-found/NotFound";

export default class App extends Component {
  render() {
    return (
      // TODO: replace with real data
      /*<UserDataContext.Provider
        value={{
          userId: "5ce1147ca0c89f001e1c2a4b",
          adminToken: "",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVjZTExNDdjYTBjODlmMDAxZTFjMmE0YiIsImZpcnN0TmFtZSI6IkFuYXRvbHkiLCJsYXN0TmFtZSI6IlNlbWVueWFrYSIsImF2YXRhciI6Imh0dHBzOi8vdC5tZS9pL3VzZXJwaWMvMzIwL3RvbHlhX2thdG9seWEuanBnIiwiYmFubmVkIjp7InN0YXR1cyI6ZmFsc2UsImV4cGlyZWQiOjB9LCJpc0FkbWluIjpmYWxzZX0sImlhdCI6MTU1ODI1NDcxNiwiZXhwIjoxNTU4ODU5NTE2fQ.t2vTbuMgfp4Q-rz6AH_d_i6F6F0ZaeH9E6e-yz2MC_4",
        }}
      >   */
      <div className={`${styles.App} ${styles.wrapper}`}>
        <Header />
        <Router>
          <Switch>
            <Route path="/" component={LoginPage} exact />
            <Route path="/team_select/" component={PageTeamSelect} exact />
            <Route path="/subscriptions/" component={SubscriptionsPage} exact />
            <Route path="/admin" component={HomeAdmin} exact />
            <Route path="/admin/topic/:id" component={OneTopic} exact />
            <Route component={NotFound} exact />
          </Switch>
        </Router>
        <Footer />
      </div>
      /*</UserDataContext.Provider> */
    );
  }
}
