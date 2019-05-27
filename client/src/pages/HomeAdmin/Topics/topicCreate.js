import React, { Component } from "react";
import PageTitle from "../../../modules/PageTitle";
import { request } from "../../../helpers/requests";
import Button from "../../../common/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import Header from "../../../common/Header";
import * as URL from "../../../constants";

class TopicCreate extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    error: "",
    linkNoHover: true,
    title: "",
    place: "",
    location: [],
  };

  componentDidMount() {}

  mouseEvents = {
    mouseOver: () => {
      this.setState({ linkNoHover: false });
    },
    mouseOut: () => {
      this.setState({ linkNoHover: true });
    },
    click: () => {
      this.props.history.push("/admin");
    },
  };

  changeInput = (title, value) => {
    this.setState({ [title]: value });
  };

  cancel = () => {
    this.props.history.push("/admin");
  };

  create = e => {
    e.preventDefault();
    const event = {
      title: this.state.title,
      description: this.state.description,
      location: [1.23456, 7.890123],
    };
    request.post(URL.EVENTS, event).then(data => {
      if (data.message === "") {
        this.props.history.push("/admin");
      } else {
        this.setState({ error: data.message });
      }
    });
  };

  render() {
    const { error } = this.state;

    return (
      <>
        <Header
          isActive={true}
          isAdmin={true}
          hasDepartment={false}
          avatar={sessionStorage.getItem("avatar")}
          name={`${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}`}
        />
        <PageTitle
          title={this.state.linkNoHover ? "Create new topic" : "← Back"}
          mouseOver={this.mouseEvents.mouseOver}
          mouseOut={this.mouseEvents.mouseOut}
          click={this.mouseEvents.click}
        />
        <form className="form">
          <input
            className="form__field-input"
            type="text"
            onChange={e => this.changeInput("title", e.target.value)}
            placeholder="title"
          />

          <input
            className="form__field-input"
            type="text"
            onChange={e => this.changeInput("description", e.target.value)}
            placeholder="description"
          />
          <input
            className="form__field-input"
            type="password"
            onChange={e => this.changeInput("location", e.target.value)}
            placeholder="Coordinates"
          />
          <Button onClick={this.cancel} text="Cancel" type="Unsubscribe" />
          <Button onClick={e => this.create(e)} text="Create" />
        </form>
        {error ? <ErrorMessage error={error} /> : ""}
      </>
    );
  }
}

export default TopicCreate;
