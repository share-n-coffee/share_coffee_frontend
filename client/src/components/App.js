import React, { useState } from "react";
import styles from "./App.module.scss";
import Header from "./Header";
import PageTitle from "./PageTitle";
import Footer from "./Footer";
import EventDesc from "./EventDesc";
import SectionMain from "./SectionMain";

import Dropdown from "./Dropdown";
import EventsDropdown from "./EventsDropdown";
import PageTeamSelect from "./PageTeamSelect";
const options = [
  { label: "Optiooooooooooooooooooon1", value: "opt1" },
  { label: "Option2", value: "opt2" },
  {
    label: "Option3",
    value: "opt3",
  },
];

const events = [
  { name: "Name1", place: "Place1", time: "Time1" },
  { name: "Name2", place: "Place2", time: "Time2" },
  { name: "Name3", place: "Place3", time: "Time3" },
];

function App() {
  const [selectedValue, setSelectedValue] = useState(null);
  return (
    <div className={styles.App}>
      <Header />
      <PageTitle title="Get your own kick off" desc="with Wargaming S&C" />
      <Dropdown
        options={options}
        selectedValue={selectedValue}
        onSelect={setSelectedValue}
      />
      <EventsDropdown events={events} />
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
