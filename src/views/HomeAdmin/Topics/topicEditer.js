import React, { Component } from "react";
import { request } from "../../../helpers/requests";
import * as URL from "../../../constants";

class TopicEditer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    event: [],
    title: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    request.get(URL.ONE_TOPIC(this.props._id)).then(data => {
      this.setState({
        event: data.object,
        error: data.message,
      });
    });
  }
  updateDate() {
    console.log(this.state.title);
  }

  changeInput(event) {
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.updateDate}>
          <label>
            Title:
            <input type="text" onChange={this.changeInput} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default TopicEditer;
