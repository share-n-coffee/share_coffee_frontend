import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { request } from "../../../helpers/requests";
import ErrorMessage from "../../../components/ErrorMessage";
import { DropdownContent, DropdownItem, Dropdown } from "../../../ui/components/dropdown";
import Button from "../../../common/Button";
import * as URL from "../../../constants";
import SpinButton from "../../../common/SpinButton";
import { Loading } from "../../../ui/components/Loader";

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
  constructor(props) {
    super(props);
  }

  state = {
    events: [],
    error: "",
    isLoadData: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ isLoadData: true });

    request.get(URL.TOPICS).then(data => {
      console.log(data.object.data);
      this.setState({
        events: data.object.data,
        error: data.message,
        isLoadData: false,
      });
    });
  }

  addTopic = e => {
    e.preventDefault();
    this.props.history.push("/admin/topic-create");
  };

  render() {
    const { events, error, isLoadData } = this.state;
    return isLoadData ? (
      <Loading />
    ) : (
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
              <div>{event.time}</div>
              <button style={{ visibility: "hidden" }} />
            </div>
          ))
        ) : (
          <div>Events is empty</div>
        )}
        <Button onClick={e => this.addTopic(e)} text="Add topic" />
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
