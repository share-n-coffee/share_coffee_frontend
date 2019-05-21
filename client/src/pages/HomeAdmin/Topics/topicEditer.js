import React, { Component } from "react";

class TopicEditer extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    event: [],
    title: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    const requestUrl = `https://forge-development.herokuapp.com/api/events/${
      this.props._id
    }`;

    fetch(requestUrl).then(event => {
      console.log(event);

      this.setState({ event: event });
    });
  }
  updateDate() {
    console.log(this.state.title);
  }

  changeInput(event) {
    console.log(event);
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
