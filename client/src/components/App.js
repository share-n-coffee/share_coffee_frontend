import React from "react";
import "./App.css";
import Header from "./Header/Header";
import PageTitle from "./PageTitle/PageTitle";
import PageInfo from "./PageInfo/PageInfo";
import Button from "./Button/Button";
import Footer from "./Footer/Footer";
import EventDesc from "./EventDesc";

function App() {
  return (
    <div className="App">
      <Header />
      <PageTitle title="Get your own kick off" desc="with Wargaming S&C" />
      <PageInfo
        infoText=" Use Telegram to be aware of upcoming meets and 
    manage
    subscriptions:"
      />
      <Button text="Log in via Telegram" />
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
