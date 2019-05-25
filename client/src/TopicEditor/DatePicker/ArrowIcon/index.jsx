import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as Arrow } from "./icon-arrow.svg";
import styles from "./styles.module.scss";

function ArrowIcon({ direction }) {
  const klass = styles[direction];
  return klass ? <Arrow className={klass} /> : null;
}

export default ArrowIcon;
