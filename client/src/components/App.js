import React, {useState} from "react";
import "./App.css";
import Header from "./Header/Header";
import PageTitle from "./PageTitle/PageTitle";
import PageInfo from "./PageInfo/PageInfo";
import Button from "./Button/Button";
import Footer from "./Footer/Footer";
import EventDesc from "./EventDesc";

import Dropdown from "./Dropdown";
import EventsDropdown from "./EventsDropdown";
const options = [{label: 'Optiooooooooooooooooooon1', value: 'opt1'}, {label: 'Option2', value: 'opt2'}, {
    label: 'Option3',
    value: 'opt3'
}];

const events = [{name: 'Name1', place: 'Place1', time: 'Time1'}, {name: 'Name2', place: 'Place2', time: 'Time2'}, {name: 'Name3', place: 'Place3', time: 'Time3'}]

function App() {
    const [selectedValue, setSelectedValue] = useState(null);
  return (
    <div className="App">
        <Dropdown options={options} selectedValue={selectedValue} onSelect={setSelectedValue}/>
        <EventsDropdown events={events}/>

    </div>
  );
}

export default App;
