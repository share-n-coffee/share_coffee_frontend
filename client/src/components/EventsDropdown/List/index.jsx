import React from "react";
import PropTypes from "prop-types";

const List = ({ events }) => {
  return (
    <ul className="event-List">
      {events.map(({ title, name, place, time }) => (
        <div className="event-item" key={title}>
          <h4 className="event_title">{title}</h4>
          <p className="event_place__name">{name}</p>
          <p className="event_place">{place}</p>
          <p className="event_time">{time}</p>
        </div>
      ))}
    </ul>
  );
};

List.propTypes = {
  events: PropTypes.array,
};

List.defaultProps = {
  events: [],
};

export default List;
