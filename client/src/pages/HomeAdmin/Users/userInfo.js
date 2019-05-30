import React, { Component } from "react";
import Button from "../../../common/Button";

class Topics extends Component {
  render() {
    const { user, toggleAdmin, toggleBan } = this.props;
    return (
      <div key={user._id} className="user-info__container">
        <img
          src={`${user.avatar ? user.avatar : require("../../../assets/img/logo.png")}`}
          alt="user photo"
        />
        <h2>{user.username} </h2>
        <h3>{user.firstName + " " + user.lastName}</h3>
        <span>
          team:{" "}
          {user.department && user.department.title
            ? `${user.department.title}`
            : `Did't choose a team`}{" "}
        </span>
        <div>
          {user.admin && user.admin.permission === 0 ? (
            <div>
              <div>
                {user.banned && !user.banned.status ? (
                  <Button onClick={() => toggleBan(user)} text="Ban User" type="Unsubscribe" />
                ) : (
                  <Button onClick={() => toggleBan(user)} text="Unban" type="Subscribe" />
                )}
              </div>
              {user.banned && !user.banned.status && (
                <Button onClick={() => toggleAdmin(user)} text="add to admin" type="Subscribe" />
              )}
            </div>
          ) : (
            <Button onClick={() => toggleAdmin(user)} text="Delete from admin" type="Subscribe" />
          )}
        </div>
      </div>
    );
  }
}

export default Topics;
