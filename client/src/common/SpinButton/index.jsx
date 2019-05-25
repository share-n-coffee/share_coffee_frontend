import React from "react";
import Button from "../Button";
import PropTypes from "prop-types";

const SpinButton = props => (
  <Button {...props} text={props.isLoading ? <span>...</span> : props.text} />
);

SpinButton.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.node,
};

SpinButton.defaultProps = {
  isLoading: false,
};

export default SpinButton;
