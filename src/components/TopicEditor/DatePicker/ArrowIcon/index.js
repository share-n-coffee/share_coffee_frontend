import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as Arrow } from "./icon-arrow.svg";
import styles from "./styles.module.scss";

const ArrowIcon = ({ direction }) => {
    return styles[direction] && <Arrow className={styles[direction]} />;
};

ArrowIcon.propTypes = {
    direction: PropTypes.string.isRequired
};

ArrowIcon.defaultProps = {
    direction: "left"
};

export default ArrowIcon;
