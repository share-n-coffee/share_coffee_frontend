import React from "react";
import PropTypes from "prop-types";

const List = ({ onItemClick, options }) => {
  return (
    <div className="department-list">
      {options.map(({ label, value }) => (
        <button key={value} onClick={() => onItemClick(value)}>
          {label}
        </button>
      ))}
    </div>
  );
};

List.propTypes = {
  onItemClick: PropTypes.func,
  options: PropTypes.array,
};

List.defaultProps = {
  options: [],
};

export default List;
