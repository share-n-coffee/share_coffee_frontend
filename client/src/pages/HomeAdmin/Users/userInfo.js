import React, { Component } from "react";
import { request } from "../../../helpers/requests";
import * as URL from "../../../constants";
import Button from "../../../common/Button";
import md5 from "js-md5";

class Topics extends Component {
  state = {
    users: [],
    admin: "",
    banned: false,
    user: "",
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({
        user: nextProps.user,
      });
    }
  }

  toggleBan = user => {
    const status = {
      ban: {
        status: !user.banned.status,
      },
    };

    request.put(URL.BAN_USER(user._id), status).then(data => {
      this.setState({
        user: data.object.data,
      });
      this.setState({ error: data.message });
    });
  };

  toggleAdmin = user => {
    const status = {
      admin: {
        permission: user.admin.permission === 1 ? 0 : 1,
        password: user.admin.permission === 1 ? "" : md5("test"),
      },
    };

    request.put(URL.ONE_USER(user._id), status).then(data => {
      this.setState({
        user: data.object.data,
        error: data.message,
      });
    });
  };

  render() {
    const { user } = this.state;
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
                  <Button onClick={() => this.toggleBan(user)} text="Ban User" type="Unsubscribe" />
                ) : (
                  <Button onClick={() => this.toggleBan(user)} text="Unban" type="Subscribe" />
                )}
              </div>
              {user.banned && !user.banned.status && (
                <Button
                  onClick={() => this.toggleAdmin(user)}
                  text="add to admin"
                  type="Subscribe"
                />
              )}
            </div>
          ) : (
            <Button
              onClick={() => this.toggleAdmin(user)}
              text="Delete from admin"
              type="Subscribe"
            />
          )}
        </div>
      </div>
    );
  }
}

export default Topics;
