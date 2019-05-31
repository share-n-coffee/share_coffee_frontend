import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { request } from "../../../helpers/requests";
import ErrorMessage from "../../../components/ErrorMessage";
import { DropdownContent, DropdownItem, Dropdown } from "../../../ui/components/dropdown";
import Button from "../../../common/Button";
import * as URL from "../../../constants";
import Pagination from "../../../components/Pagination";

class TopicDropdown extends Component {
  state = {
    subscribers: [],
    openSubscribers: "",
    error: "",
  };

  componentDidMount() {
    this.getSubscribers(this.props.id);
  }

  getSubscribers = id => {
    request.get(URL.GET_TOPIC_SUBSCRIBERS(id)).then(data => {
      this.setState({
        subscribers: data.object.data,
        error: data.message,
      });
    });
  };

  openSubscribers = id => {
    if (this.state.openSubscribers === id) {
      this.setState({ openSubscribers: "" });
    } else {
      this.setState({ openSubscribers: id });
    }
  };

  render() {
    const { subscribers, openSubscribers } = this.state;
    const { id } = this.props;
    const length = subscribers.filter(subscriber => subscriber && subscriber.firstName).length;

    return (
      <Dropdown
        length={length}
        onClick={() => length > 0 && this.openSubscribers(id)}
        open={openSubscribers === id}
      >
        {subscribers && length > 0 ? `Subscribers (${length})` : `(0 Subscribers)`}
        <DropdownContent open={openSubscribers === id}>
          {subscribers &&
            length > 0 &&
            subscribers.map(
              subscriber =>
                subscriber &&
                subscriber.firstName && (
                  <DropdownItem key={subscriber._id}>
                    {subscriber.firstName} {subscriber.lastName}
                  </DropdownItem>
                ),
            )}
        </DropdownContent>
      </Dropdown>
    );
  }
}

class Topics extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    events: [],
    error: "",
    pageCount: 1,
  };

  componentDidMount() {
    this.getData();
  }

  getData(page = 0, limit = 5) {
    request.get(URL.TOPICS(page, limit)).then(data => {
      console.log(data.object.data);
      this.setState({
        events: data.object.data,
        pageCount: data.object.pages.total,
        error: data.message,
      });
    });
  }

  pagination(currentPage) {
    console.log(currentPage);
    this.getData(currentPage - 1);
  }

  addTopic = e => {
    e.preventDefault();
    this.props.history.push("/admin/topic-create");
  };

  timestamp = createdTime => {
    let date = new Date(createdTime);
    let years = date.getFullYear();
    let months = "0" + (date.getMonth() + 1);
    let days = "0" + date.getDate();
    return days.substr(-2) + "." + months.substr(-2) + "." + years;
  };

  eventDay(day) {
    const daysOfTheWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return `every ${daysOfTheWeek[day]}`;
  }

  render() {
    const { events, error, pageCount } = this.state;
    return (
      <div style={{ textAlign: "left" }}>
        {events && events.length > 0 ? (
          events.map(event => (
            <div key={event._id} className={"one-topic"}>
              <Link to={{ pathname: `/admin/topic/${event._id}` }} className={"title"}>
                <span className={`event-status ${event.active ? "active" : ""}`} />
                {event.title}
              </Link>

              <TopicDropdown id={event._id} />
              <span>Place: </span>
              <div>{event.address}</div>
              <span>Time:</span>
              <div>
                {event.cyclic ? this.eventDay(event.weekDay) : this.timestamp(event.singleDate)},{" "}
                {event.time}
              </div>
              <button style={{ visibility: "hidden" }} />
            </div>
          ))
        ) : (
          <div>Events is empty</div>
        )}

        <Pagination pageCount={pageCount} change={currentPage => this.pagination(currentPage)} />

        <div className="add_btn">
          <Button onClick={e => this.addTopic(e)} text="Add Topic" />
        </div>
        {error ? <ErrorMessage error={error} /> : null}
      </div>
    );
  }
}

Topics.propTypes = {
  location: PropTypes.object,
  children: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Topics;
