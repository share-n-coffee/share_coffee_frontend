import React, { Component } from "react";

import WeekPicker from "../WeekPicker";
import DatePicker from "../DatePicker";
import PickerButton from "../PickerButton";

import { PLACEHOLDERS, REGULARITY } from "../constants";

// import styles from "./styles.module.scss";

class TimeChooser extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowPicker: false };

    this.showPicker = this.showPicker.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
  }

  showPicker(event) {
    event.preventDefault();
    this.setState({ isShowPicker: true });
  }

  hidePicker(event) {
    event.preventDefault();
    this.setState({ isShowPicker: false });
  }

  render() {
    const { isRegular } = this.props;
    const { isShowPicker } = this.state;

    let picker;
    switch (isRegular) {
      case REGULARITY.periodic:
        picker = (
          <WeekPicker
            weekDay={this.props.weekDay}
            onChange={this.props.onChange}
            onMouseLeave={this.hidePicker}
          />
        );
        break;
      case REGULARITY.single:
        picker = (
          <DatePicker
            onChange={this.props.onChange}
            onMouseLeave={this.hidePicker}
          />
        );
        break;
      default:
        picker = null;
        break;
    }

    return (
      <div>
        <input
          type="text"
          name="time"
          placeholder={PLACEHOLDERS.time}
          onFocus={this.showPicker}
          onBlur={this.hidePicker}
          onMouseLeave={this.hidePicker}
          required
        />
        {isShowPicker ? picker : <PickerButton onClick={this.showPicker} />}
      </div>
    );
  }
}

export default TimeChooser;
