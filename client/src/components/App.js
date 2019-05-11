import React from "react";
import "./App.css";
import Header from "./Header/Header";
import PageTitle from "./PageTitle/PageTitle";
import Footer from "./Footer/Footer";
import EventDesc from "./EventDesc";
import SectionMain from "./SectionMain/SectionMain";

function App() {
  return (
    <div className="App">
      <Header />
      <PageTitle title="Get your own kick off" desc="with Wargaming S&C" />
      <SectionMain />
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
