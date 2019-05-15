import React, { Component } from "react";
import styles from "./App.module.scss";
import LoginPage from "../pages/LoginPage";

import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Router>
          <Route path="/" component={LoginPage} exact />
        </Router>
      </div>
    );
  }
}
