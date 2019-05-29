import React from "react";

import { ReactComponent as Arrow } from "./icon-arrow.svg";
import styles from "./styles.module.scss";

function ArrowIcon({ direction }) {
  const klass = styles[direction];
  return klass ? <Arrow className={klass} /> : null;
}

export default ArrowIcon;
