import React from "react";
import PropTypes from "prop-types";
import {
  timeConverter,
  letterTransform,
  checkerNone,
  secConverter,
} from "../../../helpers/helpers";

const List = ({ events }) => {
  return (
    <>
      {events.length === 0 ? (
        <ul className="event-List">
          <div className="event-item">
            <h4 className="event_title">No confirmed events</h4>
          </div>
        </ul>
      ) : (
        <ul className="event-List">
          {events.map(({ id, topic, date }) => (
            <div className="event-item" key={id}>
              <h4 className="event_title">{letterTransform(checkerNone(topic.title))}</h4>
              <p className="event_place">{checkerNone(topic.address)}</p>
              <p className="event_time">{`${timeConverter(checkerNone(date))} - ${secConverter(
                date,
              )}`}</p>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

List.propTypes = {
  events: PropTypes.array,
};

List.defaultProps = {
  events: [],
};

export default List;
