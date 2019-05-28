import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

function PickerButton({ onClick }) {
  return <button className={styles.icon_calendar} onClick={onClick} />;
}

PickerButton.propTypes = {
  onClick: PropTypes.func,
};

export default PickerButton;
