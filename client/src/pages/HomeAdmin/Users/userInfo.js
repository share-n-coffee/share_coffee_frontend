import React, { Component } from "react";
import { request } from "../../../helpers/requests";
import * as URL from "../../../constants";
import Button from "../../../common/Button";

class Topics extends Component {
  state = {
    users: [],
    admin: "",
    banned: false,
  };

  getData(id) {
    request.get(URL.ONE_USER(id)).then(data => {
      this.setState({
        users: data.object,
        banned: data.object.banned,
        admin: data.object.admin,
        error: data.message,
      });
    });
  }

  toggleBan = user => {
    const status = {
      ban: {
        status: !user.banned.status,
      },
    };

    request.put(URL.BAN_USER(user._id), status).then(data => {
      this.getData(user._id);
      this.setState({ error: data.message });
    });
  };

  toggleAdmin = user => {
    const status = {
      admin: {
        isAdmin: !user.admin.isAdmin,
      },
    };

    request.put(URL.ADMIN_USER(user._id), status).then(data => {
      this.getData(user._id);
      this.setState({ error: data.message });
    });
  };

  render() {
    const { user } = this.props;
    return (
      <div key={user._id} className={""}>
        <img
          src={`${user.avatar ? user.avatar : require("../../../assets/img/logo.png")}`}
          alt="user photo"
        />
        <h2>{user.username} </h2>
        <h3>{user.firstName + " " + user.lastName}</h3>
        <span>team: {user.department}</span>
        <div>
          {user.banned && !user.banned.status ? (
            <Button onClick={() => this.toggleBan(user)} text="Ban User" type="Unsubscribe" />
          ) : (
            <Button onClick={() => this.toggleBan(user)} text="Unban" type="Subscribe" />
          )}
        </div>
        <div>
          {user.admin && !user.admin.isAdmin ? (
            <Button
              onClick={() => this.toggleAdmin(user)}
              text="Grant Admin Rights"
              type="Unsubscribe"
            />
          ) : (
            <Button
              onClick={() => this.toggleAdmin(user)}
              text="Pick Up Admin Rights"
              type="Subscribe"
            />
          )}
        </div>
      </div>
    );
  }
}

export default Topics;
