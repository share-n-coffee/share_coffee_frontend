import React, { Component } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../../../components/ErrorMessage";
import { request } from "../../../helpers/requests";
import Button from "../../../common/Button";

class OneTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      error: "",
    };
  }

  componentDidMount() {
    this.getData(this.props.id);
  }

  getData(id) {
    const requestUrl = `https://forge-development.herokuapp.com/api/events/${id}`;

    request.get(requestUrl).then(data => {
      console.log(data);
      this.setState({
        event: data.object,
        error: data.message,
      });
    });
  }

  render() {
    const { event, error } = this.state;
    return (
      <div>
        <div key={event._id} className={"one-topic"}>
          <Link to={{ pathname: `/topic/${event._id}` }} className={"title"}>
            <span className={`event-status ${event.active ? "active" : ""}`} />
            {event.title}
          </Link>
          <div />
          <span>Place: </span>
          <div>{event.address}</div>
          <span>Time:</span>
          <div>{event.options && event.options.times[0]}</div>
          <Button text="unsubscribe" />
        </div>
        {error ? <ErrorMessage error={error} /> : null}
      </div>
    );
  }
}

class UserTopics extends Component {
  render() {
    const { events, error } = this.props;
    return (
      <div>
        {events &&
          events.length > 0 &&
          events.map(event => <OneTopics id={event.eventId} key={event.eventId} />)}
        {error ? <ErrorMessage error={error} /> : null}
      </div>
    );
  }
}

export default UserTopics;
