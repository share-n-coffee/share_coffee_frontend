import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";

import WeekPicker from "../WeekPicker";
import DatePicker from "../DatePicker";
import PickerButton from "../PickerButton";

import * as formatters from "../formatters";
import { PLACEHOLDERS } from "../constants";

import styles from "./styles.module.scss";

class TimeChooser extends Component {
    constructor(props) {
        super(props);
        this.state = { isShowPicker: false };
        this.timePipe = createAutoCorrectedDatePipe("HH:MM");

        this.inputValue = "";
        this.picker = null;
        this.placeholder = null;

        this.showPicker = this.showPicker.bind(this);
        this.hidePicker = this.hidePicker.bind(this);
        this.onWeekDayChange = this.onWeekDayChange.bind(this);
        this.onSingleDateChange = this.onSingleDateChange.bind(this);
    }

    showPicker(event) {
        event.preventDefault();

        if (!this.state.isShowPicker) {
            this.setState({ isShowPicker: true });
        }
    }

    hidePicker(event) {
        event.preventDefault();

        if (this.state.isShowPicker) {
            this.setState({ isShowPicker: false });
        }
    }

    onWeekDayChange(event) {
        this.hidePicker(event);
        this.props.onChange(event);
    }

    getWeekPicker(weekDay) {
        return <WeekPicker weekDay={weekDay} onChange={this.onWeekDayChange} onMouseLeave={this.hidePicker} />;
    }

    getDatePicker(singleDate) {
        return (
            <DatePicker
                activeStartDate={singleDate}
                onChange={this.onSingleDateChange}
                onMouseLeave={this.hidePicker}
            />
        );
    }

    onSingleDateChange(data) {
        this.hidePicker();
        this.props.onSingleDateChange(data);
    }

    render() {
        const { cyclic, weekDay, time, singleDate } = this.props;
        const { isShowPicker } = this.state;

        switch (cyclic) {
            case true:
                this.placeholder = PLACEHOLDERS.weekDay;
                this.inputValue = formatters.periodicTime(weekDay, "");
                this.picker = this.getWeekPicker(weekDay);
                break;
            case false:
                this.placeholder = PLACEHOLDERS.date;
                this.inputValue = formatters.singleTime(singleDate, "");
                this.picker = this.getDatePicker(singleDate);
                break;

            default:
                break;
        }

        return (
            <Fragment>
                <div className={styles.time_chooser} onMouseLeave={this.hidePicker}>
                    <input
                        className={`${styles.time_input}`}
                        type="text"
                        value={this.inputValue}
                        placeholder={this.placeholder}
                        onClick={this.showPicker}
                        readOnly
                        required
                    />

                    <div className={styles.picker_container}>
                        <PickerButton onClick={this.showPicker} />
                        {isShowPicker ? this.picker : null}
                    </div>
                </div>

                <MaskedInput
                    type="text"
                    name="time"
                    value={time}
                    placeholder={PLACEHOLDERS.time}
                    mask={[/\d/, /\d/, ":", /\d/, /\d/]}
                    keepCharPositions
                    pipe={this.timePipe}
                    onChange={this.props.onChange}
                    placeholderChar={"\u2000"}
                />
            </Fragment>
        );
    }
}

TimeChooser.propTypes = {
    onSingleDateChange: PropTypes.func,
    cyclic: PropTypes.bool.isRequired,
    weekDay: PropTypes.number,
    time: PropTypes.string,
    singleDate: PropTypes.number,
    onChange: PropTypes.func
};

export default TimeChooser;
