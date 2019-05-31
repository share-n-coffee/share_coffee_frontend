import React, { useState } from "react";
import PropTypes from "prop-types";
import List from "./List";
// import { ReactComponent as ArrowIcon } from "../../icons/Arrow.svg";

/**
 * Dropdown component for showing user events
 * @param events (array of label-value objects)
 * example:
 * [{name: "name1", place: "place1", time:"1st September"}, {name: "name2", place: "place2", time:"1st September"}]
 */
const EventsDropdown = ({ events }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      onMouseLeave={() => {
        setIsOpened(false);
      }}
      className="event-list_container"
    >
      <button
        className="event-header"
        onClick={() => {
          setIsOpened(!isOpened);
        }}
      >
        <span>My upcoming events ({events.length})</span>
        <span className={`event-arrow ${isOpened ? "event-rotated" : ""}`}>↓</span>
      </button>
      {isOpened && (
        <div className="list">
          <List events={events} />{" "}
        </div>
      )}
    </div>
  );
};

EventsDropdown.propTypes = {
  events: PropTypes.array,
};

export default EventsDropdown;
