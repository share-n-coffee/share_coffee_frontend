import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const Button = props => {
  const { text, onClick, disabled } = props;
  return (
    <button
      className={styles.section__btn}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
