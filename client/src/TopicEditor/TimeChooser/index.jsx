import React, { Component } from "react";
import PropTypes from "prop-types";

import WeekPicker from "../WeekPicker";
import DatePicker from "../DatePicker";
import PickerButton from "../PickerButton";
import * as fmt from "./formatters";

import { PLACEHOLDERS, REGULARITY } from "../constants";

import styles from "./styles.module.scss";

class TimeChooser extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowPicker: false };

    this.showPicker = this.showPicker.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  showPicker(event) {
    event.preventDefault();
    if (!this.state.isShowPicker) {
      this.setState({ isShowPicker: true });
    }
  }

  hidePicker(event) {
    event.preventDefault();
    if (this.state.isShowPicker) {
      this.setState({ isShowPicker: false });
    }
  }

  onChange(event) {
    this.hidePicker(event);
    this.props.onChange(event);
  }

  render() {
    const { isRegular, weekDay, time, date, onChange } = this.props;
    const { isShowPicker } = this.state;

    let inputValue = "";
    let picker = null;

    switch (isRegular) {
      case REGULARITY.periodic:
        inputValue = fmt.periodicTime(weekDay, time);
        picker = (
          <WeekPicker
            weekDay={weekDay}
            onChange={this.onChange}
            onMouseLeave={this.hidePicker}
          />
        );
        break;
      case REGULARITY.single:
        inputValue = fmt.singleTime(date, time);
        picker = (
          <DatePicker
            date={date}
            onChange={this.onChange}
            onMouseLeave={this.hidePicker}
          />
        );
        break;
      default:
        picker = null;
        inputValue = "";
        break;
    }

    return (
      <div className={styles.time_chooser} onMouseLeave={this.hidePicker}>
        <input
          className={styles.time_input}
          type="text"
          name="time"
          value={inputValue}
          placeholder={PLACEHOLDERS.time}
          onChange={this.props.onChange}
          onClick={this.showPicker}
          required
        />
        <div className={styles.picker_container}>
          <PickerButton onClick={this.showPicker} />
          {isShowPicker ? picker : null}
        </div>
      </div>
    );
  }
}

TimeChooser.propTypes = {
  isRegular: PropTypes.string,
  weekDay: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  onChange: PropTypes.func,
};

export default TimeChooser;
