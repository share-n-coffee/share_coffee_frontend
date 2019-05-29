import React, { Component } from "react";
import PropTypes from "prop-types";

import TimeChooser from "./TimeChooser";
import TopicDescription from "../TopicDescription";
import CyclicChooser from "./CyclicChooser";

import * as formatters from "./formatters";
import styles from "./styles.module.scss";

import { PLACEHOLDERS, DEFAULT_COORDINATES, CYCLIC } from "./constants";

class TopicEditor extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.topicData;
    this.state.errors = {};

    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onSingleDateChange = this.onSingleDateChange.bind(this);
  }

  stateSetting(name, payload) {
    const { errors } = this.state;
    if (payload.error !== undefined) {
      errors[name] = payload.error;
    }
    this.setState(
      {
        errors,
        [name]: payload.value,
      },
      () => console.log("state changed:", this.state),
    );
  }

  onSave(e) {
    e.preventDefault();
    console.log("saving");
    console.log(this.state);
  }

  onCancel(event) {
    event.preventDefault();
    console.log("canceling");
  }

  onChange(event) {
    const { target } = event;
    const { name } = target;
    const { value } = target;

    const handlerMap = {
      location: this.onLocationChange,
      cyclic: this.onCyclicChange,
      time: this.onTimeChange,
      weekDay: this.onWeekDayChange,
      singleDate: this.onSingleDateChange,
    };

    if (name in handlerMap) {
      handlerMap[name].call(this, name, value);
      return;
    }

    this.stateSetting(name, { value });
  }

  onLocationChange(name, value) {
    const newValue = DEFAULT_COORDINATES;
    value
      .split(", ")
      .slice(0, 2)
      .forEach((str, index) => {
        const num = Number(str);
        const coordinate = Number.isNaN(num) || str === "" ? String(0) : str;
        // TODO: validate coordinate (-180, 180; -90, 90)
        newValue[index] = coordinate;
      });
    this.stateSetting(name, { value: newValue });
  }

  onCyclicChange(name, value) {
    const parsedValue = JSON.parse(value);
    this.stateSetting(name, { value: parsedValue });
  }

  onTimeChange(name, value) {
    this.stateSetting(name, { value });
  }

  onWeekDayChange(name, value) {
    const parsedValue = Number(value);
    this.stateSetting(name, { value: parsedValue });
  }

  onSingleDateChange(value) {
    const parsedValue = value.getTime();
    this.stateSetting("singleDate", { value: parsedValue });
  }

  onDescriptionChange(description) {
    const parsedValue = description;
    this.stateSetting("description", { value: parsedValue });
  }

  render() {
    const { cyclic } = this.state;
    return (
      <div className={styles.topic_editor}>
        <form className={styles.topic_editor_form} onSubmit={this.onSave}>
          <div>
            <button onClick={this.onCancel}>Cancel</button>
            <button type="submit">Save</button>
          </div>

          <input
            type="text"
            name="title"
            placeholder={PLACEHOLDERS.title}
            value={this.state.title}
            onChange={this.onChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder={PLACEHOLDERS.address}
            value={this.state.address}
            onChange={this.onChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder={PLACEHOLDERS.location}
            value={formatters.location(this.state.location)}
            onChange={this.onChange}
            required
          />

          <CyclicChooser onChange={this.onChange} cyclic={cyclic} options={CYCLIC} />

          {cyclic !== undefined ? (
            <TimeChooser
              cyclic={cyclic}
              weekDay={this.state.weekDay}
              singleDate={this.state.singleDate}
              time={this.state.time}
              onChange={this.onChange}
              onSingleDateChange={this.onSingleDateChange}
            />
          ) : null}

          <TopicDescription
            data={this.state.description}
            editable={true}
            onChange={this.onDescriptionChange}
          />
        </form>
      </div>
    );
  }
}

TopicEditor.propTypes = {
  topicData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.arrayOf(PropTypes.number),
    address: PropTypes.string.isRequired,
    // cyclic: PropTypes.bool.isRequired,
    weekDay: PropTypes.number,
    time: PropTypes.string.isRequired,
    singleDate: PropTypes.number,
  }),
};

TopicEditor.defaultProps = {
  topicData: {
    title: "",
    description: "",
    address: "",
    // cyclic: false,
    time: "",
  },
};

export default TopicEditor;