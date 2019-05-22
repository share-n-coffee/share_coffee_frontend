import React, { Component } from "react";
import ErrorMessage from "../../../components/ErrorMessage";

class Topics extends Component {
  render() {
    const { logs, error } = this.props;
    return (
      <div>
        <p>Bans</p>
        {logs &&
          logs.bans &&
          logs.bans.length > 0 &&
          logs.bans.map(ban => <p>users ban info</p>)}
        {error ? <ErrorMessage error={error} /> : null}
      </div>
    );
  }
}

export default Topics;
