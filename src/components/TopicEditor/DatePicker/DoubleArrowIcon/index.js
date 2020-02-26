import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as DoubleArrow } from "./icon-double-arrow.svg";
import styles from "./styles.module.scss";

const DoubleArrowIcon = ({ direction }) => {
    return styles[direction] && <DoubleArrow className={styles[direction]} />;
};

DoubleArrowIcon.propTypes = {
    direction: PropTypes.string.isRequired
};

DoubleArrowIcon.defaultProps = {
    direction: "left"
};

export default DoubleArrowIcon;
