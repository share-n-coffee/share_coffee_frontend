import React, { Component } from "react";
import styles from "./styles.module.scss";
import PageTitle from "../../modules/PageTitle";
import EventDesc from "../../events/components/EventDesc";

const events = [
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
];

class SubscriptionsPage extends Component {
  render() {
    return (
      <main>
        <PageTitle title="Current topics" />
        <EventDesc className={styles.event} events={events} />
      </main>
    );
  }
}

export default SubscriptionsPage;
