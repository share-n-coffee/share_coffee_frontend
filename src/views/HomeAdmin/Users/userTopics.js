import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ErrorMessage from "../../../components/ErrorMessage";
import { request } from "../../../helpers/requests";
import * as URL from "../../../constants";

class OneTopics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: {},
            error: ""
        };
    }

    componentDidMount() {
        this.getData(this.props.id);
    }

    timestamp = createdTime => {
        const date = new Date(createdTime);
        const years = date.getFullYear();
        const months = "0" + (date.getMonth() + 1);
        const days = "0" + date.getDate();
        return days.substr(-2) + "." + months.substr(-2) + "." + years;
    };

    eventDay(day) {
        const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return `every ${daysOfTheWeek[day]}`;
    }

    getData(id) {
        request.get(URL.ONE_TOPIC(id)).then(data => {
            this.setState({
                event: data.object.data[0],
                error: data.message
            });
        });
    }

    render() {
        const { event, error } = this.state;

        return (
            <div>
                {event ? (
                    <div key={event._id} className={"one-topic"}>
                        <Link to={{ pathname: `/topic/${event._id}` }} className={"title"}>
                            <span className={`event-status ${event.active ? "active" : ""}`} />
                            {event.title}
                        </Link>
                        <div />
                        <span>Place: </span>
                        <div>{event.address}</div>
                        <span>Time:</span>
                        <div>
                            {event.cyclic ? this.eventDay(event.weekDay) : this.timestamp(event.singleDate)},{" "}
                            {event.time}
                        </div>
                        <div>{event.options && event.options.times[0]}</div>
                        <button style={{ visibility: "hidden" }} />
                        {/*<Button text="unsubscribe" />*/}
                    </div>
                ) : (
                    ""
                )}
                {error && <ErrorMessage error={error} />}
            </div>
        );
    }
}

OneTopics.propTypes = {
    id: PropTypes.string
};

const UserTopics = ({ events, error }) => {
    return (
        <div className="user-topic__container">
            {events && events.length > 0 ? (
                events.map(event => <OneTopics id={event.topicId} key={event.topicId} />)
            ) : (
                <div>User topic is empty</div>
            )}
            {/*<Pagination pageCount={pageCount} change={currentPage => this.pagination(currentPage)} />*/}

            {error && <ErrorMessage error={error} />}
        </div>
    );
};

UserTopics.propTypes = {
    events: PropTypes.array,
    error: PropTypes.string
};

export default UserTopics;
