import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./styles.module.scss";

export const Button = ({ value, onClick, disabled, type }) => {
    const ClassName = classNames({
        [styles.subscribe]: type === "Subscribe",
        [styles.unsubscribe]: type === "Unsubscribe",
        [styles.primary]: type === "primary",
        [styles.logout]: type === "logout"
    });

    return (
        <button className={`${styles.section__btn} ${ClassName}`} onClick={onClick} disabled={disabled} type={type}>
            {value}
        </button>
    );
};

Button.propTypes = {
    value: PropTypes.node,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.string
};

Button.defaultProps = {
    type: "primary"
};
