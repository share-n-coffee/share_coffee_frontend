import React, { Fragment } from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

function CyclicChooser({ cyclic, onChange, options }) {
  const radioGroup = options.map(item => (
    <Fragment key={item.value}>
      <input
        type="radio"
        name="cyclic"
        id={item.name}
        value={item.value}
        checked={cyclic === item.value}
        onChange={onChange}
        required
      />
      <label htmlFor={item.name}>{item.label}</label>
    </Fragment>
  ));
  return <div className={styles.topic_editor_periodic}>{radioGroup}</div>;
}

CyclicChooser.propTypes = {
  onChange: PropTypes.func,
};

export default CyclicChooser;
