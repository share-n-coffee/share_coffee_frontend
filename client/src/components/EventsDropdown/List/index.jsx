import React from "react";
import PropTypes from "prop-types";

const List = ({ events }) => {
  return (
    <ul className="event-List">
      {events.map(({ name, place, time }) => (
        <div className="event-item" key={name}>
          <p>{name}</p>
          <p>{place}</p>
          <p>{time}</p>
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
