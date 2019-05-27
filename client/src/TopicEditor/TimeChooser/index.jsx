import React, { Component } from "react";
import PropTypes from "prop-types";

import WeekPicker from "../WeekPicker";
import DatePicker from "../DatePicker";
import PickerButton from "../PickerButton";

import * as formatters from "../formatters";
import { PLACEHOLDERS } from "../constants";

import styles from "./styles.module.scss";

class TimeChooser extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowPicker: false };

    this.showPicker = this.showPicker.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSingleDateChange = this.onSingleDateChange.bind(this);
  }

  showPicker(event) {
    if (event) {
      event.preventDefault();
    }

    if (!this.state.isShowPicker) {
      this.setState({ isShowPicker: true });
    }
  }

  hidePicker(event) {
    if (event) {
      event.preventDefault();
    }

    if (this.state.isShowPicker) {
      this.setState({ isShowPicker: false });
    }
  }

  onChange(event) {
    this.hidePicker(event);
    this.props.onChange(event);
  }

  onSingleDateChange(data) {
    this.hidePicker();
    this.props.onSingleDateChange(data);
  }

  render() {
    const { cyclic, weekDay, time, singleDate } = this.props;
    const { isShowPicker } = this.state;

    let inputValue = "";
    let picker = null;

    switch (cyclic) {
      case true:
        inputValue = formatters.periodicTime(weekDay, time);
        picker = (
          <WeekPicker
            weekDay={weekDay}
            onChange={this.onChange}
            onMouseLeave={this.hidePicker}
          />
        );
        break;
      case false:
        inputValue = formatters.singleTime(singleDate, time);
        picker = (
          <DatePicker
            activeStartDate={singleDate}
            onChange={this.onSingleDateChange}
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
  cyclic: PropTypes.bool.isRequired,
  weekDay: PropTypes.number,
  time: PropTypes.string,
  singleDate: PropTypes.number,
  onChange: PropTypes.func,
};

export default TimeChooser;
