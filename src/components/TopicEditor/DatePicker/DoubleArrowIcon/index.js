import React from "react";

import { ReactComponent as DoubleArrow } from "./icon-double-arrow.svg";
import styles from "./styles.module.scss";

function DoubleArrowIcon({ direction }) {
  const klass = styles[direction];
  return klass ? <DoubleArrow className={klass} /> : null;
}

export default DoubleArrowIcon;
