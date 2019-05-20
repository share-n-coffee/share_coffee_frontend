import React, { Component } from "react";

import styles from "./styles.module.scss";

import PREDEFINED_TOPIC from "./constants";

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
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value,
      },
      () => console.log("state changed:", this.state),
    );
  }

  render() {
    return (
      <div className={styles.topic_editor}>
        <form onSubmit={this.onSave}>
          <div>
            <button onClick={this.onCancel}>Cancel</button>
            <button type="submit">Save</button>
          </div>

          <div>
            <label htmlFor="topic_title">Title</label>
            <input
              type="text"
              id="topic_title"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              required
            />
          </div>

          <div>[ TopicDescription component ]</div>

          <div>
            <label htmlFor="regular">Regular</label>
            <input
              type="checkbox"
              name="isRegular"
              checked={this.state.isRegular}
              onChange={this.onChange}
              id="regular"
            />
          </div>

          <div>
            <label htmlFor="">Week day</label>
            <select
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
            </select>
          </div>

          <div>
            <label htmlFor="topic_date">Date</label>
            <input
              type="date"
              name="date"
              id="topic_date"
              value={this.state.date}
              onChange={this.onChange}
              required
            />
          </div>

          <div>
            <label htmlFor="topic_time">Time</label>
            <input
              type="time"
              name="time"
              id="topic_time"
              value={this.state.time}
              onChange={this.onChange}
              required
            />
          </div>

          <div>
            <label htmlFor="topic_place">Place</label>
            <textarea
              type="text"
              name="place"
              id="topic_place"
              rows="3"
              wrap="soft"
              value={this.state.place}
              onChange={this.onChange}
              required
            />
          </div>

          <div>[ Map component ]</div>
        </form>
      </div>
    );
  }
}

export default TopicEditor;
