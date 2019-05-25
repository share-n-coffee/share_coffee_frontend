import React from "react";
import Button from "../Button";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const SpinButton = props => (
  <Button
    {...props}
    text={
      props.isLoading ? (
        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
      ) : (
        props.text
      )
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
