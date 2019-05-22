import React, { Component, useContext } from "react";
import styles from "./styles.module.scss";
import LoginPage from "../pages/LoginPage";
import PageTeamSelect from "../pages/PageTeamSelect";
import SubscriptionsPage from "../pages/SubscriptionsPage";
// import UserDataContext from "../contexts/UserDataContext";
import Header from "../common/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "../common/Footer";

export default class App extends Component {
  render() {
    return (
      // TODO: replace with real data
      /*<UserDataContext.Provider
        value={{
          userId: "5ce1147ca0c89f001e1c2a4b",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVjZTExNDdjYTBjODlmMDAxZTFjMmE0YiIsImZpcnN0TmFtZSI6IkFuYXRvbHkiLCJsYXN0TmFtZSI6IlNlbWVueWFrYSIsImF2YXRhciI6Imh0dHBzOi8vdC5tZS9pL3VzZXJwaWMvMzIwL3RvbHlhX2thdG9seWEuanBnIiwiYmFubmVkIjp7InN0YXR1cyI6ZmFsc2UsImV4cGlyZWQiOjB9LCJpc0FkbWluIjpmYWxzZX0sImlhdCI6MTU1ODI1NDcxNiwiZXhwIjoxNTU4ODU5NTE2fQ.t2vTbuMgfp4Q-rz6AH_d_i6F6F0ZaeH9E6e-yz2MC_4",
        }
      >                    */
      <div className={`${styles.App} ${styles.wrapper}`}>
        <Router>
          <Route path="/" component={LoginPage} exact />
          <Route path="/team_select/" component={PageTeamSelect} exact />
          <Route path="/subscriptions/" component={SubscriptionsPage} exact />
        </Router>
        <Footer />
      </div>
      /*</UserDataContext.Provider> */
    );
  }
}
