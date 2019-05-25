import React, { Component } from "react";
import Calendar from "react-calendar/dist/entry.nostyle";

import DoubleArrowIcon from "./DoubleArrowIcon";
import ArrowIcon from "./ArrowIcon";

import "./styles.scss";

function DatePicker({ date, onChange }) {
  const next2Label = <DoubleArrowIcon direction={"right"} />;
  const nextLabel = <ArrowIcon direction={"right"} />;
  const prev2Label = <DoubleArrowIcon direction={"left"} />;
  const prevLabel = <ArrowIcon direction={"left"} />;
  return (
    <Calendar
      onChange={onChange}
      locale={"en-US"}
      value={date}
      nextLabel={nextLabel}
      next2Label={next2Label}
      prevLabel={prevLabel}
      prev2Label={prev2Label}
    />
  );
}

export default DatePicker;
