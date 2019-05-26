import React from "react";
import PropTypes from "prop-types";

import { WEEK_DAYS_NAMES, WEEK, WEEK_PICKER_TITLE } from "./constants";

import styles from "./styles.module.scss";

function WeekPicker({ onChange }) {
  const week_days = WEEK.map((day, index) => (
    <label className={styles.week_picker_label} key={index}>
      {WEEK_DAYS_NAMES[day].abbr}
      <input
        className={styles.week_picker_radio}
        type="radio"
        name="weekDay"
        value={day}
        onChange={onChange}
        required
      />
    </label>
  ));

  return (
    <div className={styles.week_picker}>
      <div className={styles.week_picker_title}>{WEEK_PICKER_TITLE}</div>
      <div className={styles.week_picker_days}>{week_days}</div>
    </div>
  );
}

WeekPicker.propTypes = {
  onChange: PropTypes.func,
};

export default WeekPicker;
