import React from "react";
import PropTypes from "prop-types";

function BanMsg() {
  const msg = "Sorry, you banned(((";
  return (
    <div className="form__error-wrapper js-form__err-animation">
      <p className="form__ban">{msg}</p>
    </div>
  );
}

// BanMsg.propTypes = {
//   error: PropTypes.string,
// };

export default BanMsg;
