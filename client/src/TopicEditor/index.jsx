import React, { Component } from "react";
import PropTypes from "prop-types";

import TimeChooser from "./TimeChooser";
import TopicDescription from "../TopicDescription";
import CyclicChooser from "./CyclicChooser";

import styles from "./styles.module.scss";

import {
  PLACEHOLDERS,
  COORDINATES_SEP,
  DEFAULT_COORDINATES,
  CYCLIC,
} from "./constants";

class TopicEditor extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.topicData;

    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
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
      () => console.log("state changed:", this.state),
    );
  }

  onDescriptionChange(description) {
    this.setState({ description }, () =>
      console.log("state changed:", this.state),
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

          <CyclicChooser
            onChange={this.onChange}
            cyclic={cyclic}
            options={CYCLIC}
          />

          {cyclic !== undefined ? (
            <TimeChooser
              cyclic={cyclic}
              weekDay={this.state.weekDay}
              singleDate={this.state.singleDate}
              time={this.state.time}
              onChange={this.onChange}
            />
          ) : null}

          <TopicDescription
            data={this.state.description}
            editable={true}
            onChange={this.onDescriptionChange}
          />

          <div>[ Map component ]</div>
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
