import React from "react";
import PropTypes from "prop-types";

function ErrorMessage(props) {
  return (
    <div className="form__error-wrapper js-form__err-animation">
      <p className="form__error">{props.error}</p>
    </div>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

export default ErrorMessage;
