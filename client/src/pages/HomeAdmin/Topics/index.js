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
        {subscribers.length > 0 ? `Subscribers (${subscribers.length})` : `(0 Subscribers)`}
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
    request.get(URL.GET_TOPIC_SUBSCRIBERS(id)).then(data => {
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
          <img src={require("../../../assets/img/close.svg")} alt="" onClick={this.toggle} />
        ) : (
          <div>
            Are you sure you want to delete?
            <Button onClick={this.clear} text="Cancel" type="Unsubscribe" />
            <Button onClick={this.delete} text="Delete" />
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
    isLoading: "",
    isLoadData: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ isLoadData: true });

    request.get(URL.EVENTS).then(data => {
      this.setState({
        events: data.object,
        error: data.message,
        isLoadData: false,
      });
    });
  }

  generatePairs(id) {
    this.setState({ isLoading: id });
    request.post(URL.GENERATE_PAIRS(id)).then(data => {
      this.setState({ isLoading: "" });
    });
  }

  addTopic = e => {
    e.preventDefault();
    this.props.history.push("/admin/topic-create");
  };

  render() {
    const { events, error, isLoading, isLoadData } = this.state;
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
              <div>{event.options.times}</div>
              <SpinButton
                onClick={() => this.generatePairs(event._id)}
                text="pairs"
                isLoading={isLoading === event._id}
              />
              <DeleteBtn id={event._id} />
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
