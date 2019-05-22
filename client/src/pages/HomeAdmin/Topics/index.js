import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import requests from "../../../helpers/requests";
import ErrorMessage from "../../../components/ErrorMessage";
import {
  DropdownContent,
  DropdownItem,
  Dropdown,
} from "../../../ui/components/dropdown";
import { Button, ButtonText } from "../../../ui/components/button";

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
    const requestUrl = `https://forge-development.herokuapp.com/api/users/?events.eventId=${id}`;
    requests.get(requestUrl).then(data => {
      this.setState({
        subscribers: data.object,
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

    return (
      <Dropdown
        length={subscribers.length}
        onClick={() => subscribers.length > 0 && this.openSubscribers(id)}
        open={openSubscribers === id}
      >
        {subscribers.length > 0
          ? `Subscribers (${subscribers.length})`
          : `(0 Subscribers)`}
        <DropdownContent open={openSubscribers === id}>
          {subscribers.map(subscriber => (
            <DropdownItem key={subscriber._id}>
              {subscriber.firstName} {subscriber.lastName}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    );
  }
}

class DeleteBtn extends Component {
  state = {
    subscribers: [],
    error: false,
    deleteContent: false,
  };

  componentDidMount() {
    this.getSubscribers(this.props.id);
  }

  getSubscribers = id => {
    const requestUrl = `https://forge-development.herokuapp.com/api/users/?events.eventId=${id}`;
    requests.get(requestUrl).then(data => {
      console.log(data);
      this.setState({
        subscribers: data.object,
        error: data.message,
      });
    });
  };

  toggle = () => {
    this.setState({ deleteContent: true });
  };

  clear = () => {
    this.setState({ deleteContent: false });
  };

  delete = () => {
    console.log("delete");
    this.clear();
  };

  render() {
    const { subscribers, deleteContent } = this.state;
    return subscribers && subscribers.length > 0 ? null : (
      <div className="toggle_delete">
        {!deleteContent ? (
          <img
            src={require("../../../assets/img/close.svg")}
            alt=""
            onClick={this.toggle}
          />
        ) : (
          <div>
            Are you sure you want to delete?
            <ButtonText onClick={this.clear} style={{ marginLeft: "10px" }}>
              Cancel
            </ButtonText>
            <Button onClick={this.delete} style={{ marginLeft: "10px" }}>
              Delete
            </Button>
          </div>
        )}
      </div>
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
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    const requestUrl = "https://forge-development.herokuapp.com/api/events/";

    requests.get(requestUrl).then(data => {
      this.setState({
        events: data.object,
        error: data.message,
      });
    });
  }

  generatePairs(id) {
    const requestUrl = `https://forge-development.herokuapp.com/api/randomizer/${id}`;

    requests.post(requestUrl).then(data => {
      console.log(data);
    });
  }

  addTopic() {
    console.log("adding");
  }

  render() {
    const { events, error } = this.state;
    return (
      <div style={{ textAlign: "left" }}>
        {events &&
          events.length > 0 &&
          events.map(event => (
            <div key={event._id} className={"one-topic"}>
              <Link
                to={{ pathname: `/admin/topic/${event._id}` }}
                className={"title"}
              >
                <span
                  className={`event-status ${event.active ? "active" : ""}`}
                />
                {event.title}
              </Link>

              <TopicDropdown id={event._id} />
              <span>Place: </span>
              <div>{event.address}</div>
              <span>Time:</span>
              <div>{event.options.times}</div>
              <Button onClick={() => this.generatePairs(event._id)}>
                pairs
              </Button>
              <DeleteBtn id={event._id} />
            </div>
          ))}
        <Button onClick={this.addTopic} style={{ marginTop: "10px" }}>
          Add topic
        </Button>
        {error ? <ErrorMessage error={error} /> : null}
      </div>
    );
  }
}

Topics.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Topics;
