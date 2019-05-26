import React, { Component } from "react";

class Topics extends Component {
  render() {
    const { user } = this.props;
    return (
      <div key={user._id} className="user-info__container">
        <img src={`${user.avatar}`} alt="user photo" />
        <h2>{user.username} </h2>
        <h3>{user.firstName + " " + user.lastName}</h3>
        <span>team: {user.department}</span>
      </div>
    );
  }
}

export default Topics;
