import React, { Component } from "react";
import styles from "./App.module.scss";
import Header from "./Header";
import PageTitle from "../modules/PageTitle";
import Footer from "../modules/Footer";
import EventDesc from "../events/components/EventDesc";
import SectionMain from "../pages/SectionMain";

import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [
        {
          eventName: "Platform Front-end",
          adress: "@ Latte Pytho 12 Zybitskaya St., Minsk",
          eventFrequency: "every Monday, 16:00",
          subscribe: "Subscribe",
          key: 1,
        },
        {
          eventName: "Platform Back-end",
          adress: "@ Latte Pytho 12 Zybitskaya St., Minsk",
          eventFrequency: "every Monday, 16:00",
          subscribe: "Subscribe",
          key: 2,
        },
        {
          eventName: "Something event",
          adress: "Something adress",
          eventFrequency: "hz vasche",
          subscribe: "Unsubscribe",
          key: 3,
        },
      ],
    };
  }
  render() {
    const { events } = this.state;
    const Main = () => {
      return <EventDesc events={events} />;
    };

    const PageTittle = () => {
      return (
        <PageTitle title="Get your own kick off" desc="with Wargaming S&C" />
      );
    };

    return (
      <div className={styles.App}>
        <Header />
        <Router>
          <Route path="/share_coffee_frontend/" component={PageTittle} exact />
          <Route path="/share_coffee_frontend/" component={SectionMain} exact />
          <Route
            path="/id/:id"
            render={({ match }) => {
              const { id } = match.params;
              console.log(id);
              return <Main />;
            }}
          />
        </Router>
        <Footer />
      </div>
    );
  }
}
