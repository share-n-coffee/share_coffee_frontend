import React, { Component } from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";

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
    this.timePipe = createAutoCorrectedDatePipe("HH:MM");

    this.showPicker = this.showPicker.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
    this.onWeekDayChange = this.onWeekDayChange.bind(this);
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

  onWeekDayChange(event) {
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

    let inputValue;
    let picker;
    let placeholder;

    switch (cyclic) {
      case true:
        placeholder = PLACEHOLDERS.weekDay;
        inputValue = formatters.periodicTime(weekDay, "");
        picker = (
          <WeekPicker
            weekDay={weekDay}
            onChange={this.onWeekDayChange}
            onMouseLeave={this.hidePicker}
          />
        );
        break;
      case false:
        placeholder = PLACEHOLDERS.date;
        inputValue = formatters.singleTime(singleDate, "");
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
      <>
        <div className={styles.time_chooser} onMouseLeave={this.hidePicker}>
          <input
            className={`${styles.time_input}`}
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onClick={this.showPicker}
            readOnly
            required
          />

          <div className={styles.picker_container}>
            <PickerButton onClick={this.showPicker} />
            {isShowPicker ? picker : null}
          </div>
        </div>

        <MaskedInput
          type="text"
          name="time"
          value={time}
          placeholder={PLACEHOLDERS.time}
          mask={[/\d/, /\d/, ":", /\d/, /\d/]}
          keepCharPositions={true}
          pipe={this.timePipe}
          onChange={this.props.onChange}
          placeholderChar={"\u2000"}
        />
      </>
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
