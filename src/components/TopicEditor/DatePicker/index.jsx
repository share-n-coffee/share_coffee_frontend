import React from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar/dist/entry.nostyle";

import DoubleArrowIcon from "./DoubleArrowIcon";
import ArrowIcon from "./ArrowIcon";
import locale from "./constants";

import "./styles.scss";

function DatePicker({ activeStartDate, onChange }) {
  const next2Label = <DoubleArrowIcon direction={"right"} />;
  const nextLabel = <ArrowIcon direction={"right"} />;
  const prev2Label = <DoubleArrowIcon direction={"left"} />;
  const prevLabel = <ArrowIcon direction={"left"} />;

  let date = new Date(activeStartDate);
  if (Number.isNaN(date.getDate())) {
    date = new Date();
  }

  return (
    <Calendar
      activeStartDate={date}
      onChange={onChange}
      locale={locale}
      nextLabel={nextLabel}
      next2Label={next2Label}
      prevLabel={prevLabel}
      prev2Label={prev2Label}
    />
  );
}

DatePicker.propTypes = {
  activeStartDate: PropTypes.number,
  onChange: PropTypes.func,
};

export default DatePicker;
