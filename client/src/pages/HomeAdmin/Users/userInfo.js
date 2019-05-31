import React, { Component } from "react";
import Button from "../../../common/Button";

class Topics extends Component {
  render() {
    const { user, toggleAdmin, toggleBan } = this.props;
    return (
      <div key={user._id} className="user-info__container">
        <img
          src={`${user.avatar ? user.avatar : require("../../../assets/img/logo.png")}`}
          alt="user avatar"
        />
        <div className={"info"}>
          <p>
            <b>Username: </b>
            {user.username}{" "}
          </p>
          <p>
            <b>FIO: </b> {user.firstName + " " + (user.lastName !== null ? user.lastName : "")}
          </p>
          <p>
            <b>Team: </b>
            {user.department && user.department.title
              ? `${user.department.title}`
              : `Did't choose a team`}{" "}
          </p>
        </div>

        <div>
          {user.admin && user.admin.permission !== 2 ? (
            user.admin && user.admin.permission === 0 ? (
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
            )
          ) : (
            `Super Admin`
          )}
        </div>
      </div>
    );
  }
}

export default Topics;
