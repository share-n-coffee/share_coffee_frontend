import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorMessage from "../../../components/ErrorMessage";
import Pagination from "../../../components/Pagination";
import { Link } from "react-router-dom";
import Button from "../../../common/Button";
import { request } from "../../../helpers/requests";
import * as URL from "../../../constants";

class Topics extends Component {
  state = {
    users: [],
    unsortedUser: [],
    userLength: 0,
    banned: false,
    activeFilter: "",
    up: "",
    userId: "",
    curPage: 1,
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    request.get(URL.USERS).then(data => {
      this.setState({
        users: data.object,
        unsortedUser: data.object,
        userLength: data.object.length,
        error: data.message,
      });
      this.pagination(10, this.state.curPage);
    });
  }

  toggle = user => {
    const status = {
      ban: {
        status: !user.banned.status,
      },
    };

    request.put(URL.BAN_USER(user._id), status).then(data => {
      this.getData();
      this.setState({ error: data.message });
    });
  };

  pagination(pageSize, currentPage) {
    const data = this.state.unsortedUser;
    const upperLimit = currentPage * pageSize;
    this.setState({
      users: data.slice(upperLimit - pageSize, upperLimit),
      curPage: currentPage,
    });
  }

  timestamp = createdTime => {
    let date = new Date(createdTime);
    let years = date.getFullYear();
    let months = "0" + (date.getMonth() + 1);
    let days = "0" + date.getDate();
    return days.substr(-2) + "." + months.substr(-2) + "." + years;
  };

  filter = filter => {
    this.setState({ activeFilter: filter });
    if (this.state.activeFilter === filter) {
      this.setState({ up: filter });
    } else {
      this.setState({ up: "" });
    }
    if (this.state.up === filter) {
      this.setState({ up: "" });
    }
  };

  render() {
    const { users, activeFilter, up, error, userLength } = this.state;
    return (
      <div>
        {users && users.length > 0 ? (
          <div>
            <table className={"user_block"}>
              <thead>
                <tr>
                  <th
                    className={`${activeFilter === "Username" ? "active" : ""} ${
                      up === "Username" ? "up" : ""
                    }`}
                    onClick={() => this.filter("Username")}
                  >
                    Username
                  </th>
                  <th
                    className={`${activeFilter === "Team" ? "active" : ""} ${
                      up === "Team" ? "up" : ""
                    }`}
                    onClick={() => this.filter("Team")}
                  >
                    Team
                  </th>
                  <th
                    className={`${activeFilter === "Registration" ? "active" : ""} ${
                      up === "Registration" ? "up" : ""
                    }`}
                    onClick={() => this.filter("Registration")}
                    colSpan={2}
                  >
                    Registration Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr
                    key={user._id}
                    className={`${
                      user.banned.status ? "bannedUser" : user.admin.isAdmin ? "adminUser" : ""
                    }`}
                  >
                    <td>
                      <Link to={{ pathname: `/admin/user/${user._id}` }} className={"title"}>
                        <span className={"username"}>{user.username}</span>
                      </Link>
                    </td>
                    <td>team</td>
                    <td>{this.timestamp(user.created)}</td>
                    {!user.admin.isAdmin ? (
                      <td>
                        {!user.banned.status ? (
                          <Button
                            onClick={() => this.toggle(user)}
                            text="Ban User"
                            type="Unsubscribe"
                          />
                        ) : (
                          <Button onClick={() => this.toggle(user)} text="Unban" type="Subscribe" />
                        )}
                      </td>
                    ) : (
                      <td>ADMIN</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              length={userLength}
              change={(pageSize, currentPage) => this.pagination(pageSize, currentPage)}
            />
          </div>
        ) : (
          <div>Users is empty</div>
        )}
        {error ? <ErrorMessage error={error} /> : null}
      </div>
    );
  }
}

Topics.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Topics;
