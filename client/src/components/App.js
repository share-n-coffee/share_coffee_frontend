import React from "react";
import styles from "./App.module.scss";
import Header from "./Header";
import PageTitle from "./PageTitle";
import Footer from "./Footer";
import EventDesc from "./EventDesc";
import Index from "./SectionMain";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <PageTitle title="Get your own kick off" desc="with Wargaming S&C" />
      <Index />
      <EventDesc
        eventName="Platform Front-end"
        adress="@ Latte Python 12 Zybitskaya St., Minsk"
        eventFrequency="every Monday, 16:00"
        text="Subscribe"
      />
      <Footer />
    </div>
  );
}

export default App;
