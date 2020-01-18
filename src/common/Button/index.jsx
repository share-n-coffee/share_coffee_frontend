import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./styles.module.scss";

const Button = props => {
  const { text, onClick, disabled, type } = props;
  const ClassName = classNames({
    [styles.subscribe]: type === "Subscribe",
    [styles.unsubscribe]: type === "Unsubscribe",
    [styles.primary]: type === "primary",
    [styles.logout]: type === "logout",
  });

  return (
    <button
      className={`${styles.section__btn} ${ClassName}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: "primary",
};

export default Button;
