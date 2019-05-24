import React, { Component } from "react";

import styles from "./styles.module.scss";

import {
  PREDEFINED_TOPIC,
  PLACEHOLDERS,
  COORDINATES_SEP,
  DEFAULT_COORDINATES,
  REGULARITY,
} from "./constants";

class TopicEditor extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.topicData || PREDEFINED_TOPIC;
    console.log(this.state);

    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSave(e) {
    e.preventDefault();
    console.log("saving");
    console.log(this.state);
    // TODO: send state object to backend
  }

  onCancel(event) {
    event.preventDefault();
    console.log("canceling");
    // TODO: what to do next?
  }

  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "location") {
      this.onLocationChange(name, value);
      return;
    }

    this.setState(
      {
        [name]: value,
      },
      () => console.log("state changed:", this.state.isRegular),
    );
  }

  onLocationChange(name, value) {
    const newValue = DEFAULT_COORDINATES;
    value
      .split(COORDINATES_SEP)
      .slice(0, 2)
      .forEach((str, index) => {
        const num = Number(str);
        const coordinate = Number.isNaN(num) || str === "" ? String(0) : str;
        // TODO: validate coordinate (-180, 180; -90, 90)
        newValue[index] = coordinate;
      });
    this.setState({ [name]: newValue });
  }

  render() {
    return (
      <div className={styles.topic_editor}>
        <form onSubmit={this.onSave}>
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
            name="place"
            placeholder={PLACEHOLDERS.place}
            value={this.state.place}
            onChange={this.onChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder={PLACEHOLDERS.location}
            value={
              this.state.location
                ? `${this.state.location[0]}${COORDINATES_SEP}${
                    this.state.location[1]
                  }`
                : ""
            }
            onChange={this.onChange}
            required
          />

          <div>
            <label htmlFor="periodic">Periodic</label>
            <input
              type="radio"
              name="isRegular"
              id="periodic"
              value={REGULARITY.periodic}
              checked={this.state.isRegular === REGULARITY.periodic}
              onChange={this.onChange}
              required
            />
            <label htmlFor="single">Single</label>
            <input
              type="radio"
              name="isRegular"
              id="single"
              value={REGULARITY.single}
              checked={this.state.isRegular === REGULARITY.single}
              onChange={this.onChange}
            />
          </div>

          {/* {if (this.state.isRegular===)} */}

          {/* <select
            name="weekDay"
            id="topic_week_day"
            value={this.state.weekDay}
            onChange={this.onChange}
          >
            <option value="0">Monday</option>
            <option value="1">Tuesday</option>
            <option value="2">Wednesday</option>
            <option value="3">Thursday</option>
            <option value="4">Friday</option>
            <option value="5">Saturday</option>
            <option value="6">Sunday</option>
          </select> */}

          {/* <input
            type="date"
            name="date"
            id="topic_date"
            value={this.state.date}
            onChange={this.onChange}
            required
          /> */}

          {/* <input
            type="time"
            name="time"
            id="topic_time"
            value={this.state.time}
            onChange={this.onChange}
            required
          /> */}

          <div>[ TopicDescription component ]</div>
          <div>[ Map component ]</div>
        </form>
      </div>
    );
  }
}

export default TopicEditor;
