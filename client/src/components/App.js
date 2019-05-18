import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import styles from "./App.module.scss";
import Header from "../modules/Header";
import Footer from "../modules/Footer";
import EventDesc from "../events/components/EventDesc";
import SectionMain from "../pages/SectionMain";
import PageTeamSelect from "../pages/PageTeamSelect";
import SubscriptionsPage from "../pages/SubscriptionsPage";

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

    return (
      <div className={styles.App}>
        <Header />
        <Router>
          <Route path="/" component={SectionMain} exact />
          <Route
            path="/id/:id"
            render={({ match }) => {
              const { id } = match.params;
              console.log(id);
              return <Main />;
            }}
          />
          <Route path="/team_select/" component={PageTeamSelect} exact />
          <Route path="/subscriptions/" component={SubscriptionsPage} exact />
        </Router>

        <Footer />
      </div>
    );
  }
}
