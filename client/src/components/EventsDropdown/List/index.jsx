import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const List = ({ events }) => {
  return (
    <ul className={styles.List}>
      {events.map(({ name, place, time }) => (
        <div className={styles.item} key={name}>
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
