import React, { Component } from "react";
import styles from "./App.module.scss";
import Header from "./Header";
import PageTitle from "./PageTitle";
import Footer from "./Footer";
import EventDesc from "./EventDesc";
import SectionMain from "./SectionMain";

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

    return (
      <div className={styles.App}>
        <Header />
        <PageTitle title="Get your own kick off" desc="with Wargaming S&C" />
        <SectionMain />
        <EventDesc events={events} />
        <Footer />
      </div>
    );
  }
}
