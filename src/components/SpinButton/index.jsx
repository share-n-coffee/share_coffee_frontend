import React from "react";
import Button from "../Button";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import classnames from "classnames";

const SpinButton = props => (
  <Button
    {...props}
    disabled={props.disabled || props.isLoading}
    text={
      <>
        {props.isLoading && (
          <div
            className={classnames(styles.dots, {
              [styles.greenDots]: props.type === "Subscribe",
              [styles.redDots]: props.type === "Unsubscribe",
            })}
          >
            <span />
            <span />
            <span />
          </div>
        )}
        <div className={classnames({ [styles.hidden]: props.isLoading })}>{props.text}</div>
      </>
    }
  />
);

SpinButton.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.node,
};

SpinButton.defaultProps = {
  isLoading: false,
};

export default SpinButton;
