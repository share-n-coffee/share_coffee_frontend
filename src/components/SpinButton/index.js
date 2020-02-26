import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Button } from "../Button";
import styles from "./styles.module.scss";

const SpinButton = props => (
    <Button
        {...props}
        disabled={props.disabled || props.isLoading}
        text={
            <Fragment>
                {props.isLoading && (
                    <div
                        className={classnames(styles.dots, {
                            [styles.greenDots]: props.type === "Subscribe",
                            [styles.redDots]: props.type === "Unsubscribe"
                        })}>
                        {/* why 3 span ????????*/}
                        <span />
                        <span />
                        <span />
                    </div>
                )}
                <div className={classnames({ [styles.hidden]: props.isLoading })}>{props.text}</div>
            </Fragment>
        }
    />
);

SpinButton.propTypes = {
    disabled: PropTypes.bool,
    type: PropTypes.string,
    isLoading: PropTypes.bool,
    text: PropTypes.node
};

SpinButton.defaultProps = {
    isLoading: false
};

export default SpinButton;
