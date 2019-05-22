import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorMessage from "../../../components/ErrorMessage";
import Pagination from "../../../components/Pagination";
import { Link } from "react-router-dom";
import Button from "../../../common/Button";

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
    const requestUrl = "https://forge-development.herokuapp.com/api/users/";
    const token = localStorage.getItem("adminToken");

    fetch(requestUrl, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    })
      .then(blob => blob.json())
      .then(users => {
        console.log(users);
        if (users.errors && users.errors.length > 0) {
          this.setState({ error: users.errors[0].msg });
        }
        this.setState({
          users: users,
          unsortedUser: users,
          userLength: users.length,
        });
        this.pagination(10, this.state.curPage);
      });
  }

  toggle = user => {
    // this.state.userId === '' ? this.setState({userId: id}) : this.setState({userId: ''});
    const requestUrl = `https://forge-development.herokuapp.com/api/users/ban/${
      user._id
    }`;
    const token = localStorage.getItem("adminToken");
    const status = {
      ban: {
        status: !user.banned.status,
      },
    };
    fetch(requestUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify(status),
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log(data);
        if (data.errors && data.errors.length > 0) {
          this.setState({ error: data.errors[0].msg });
        } else {
          this.getData();
        }
      })
      .catch(err => {
        this.setState({ error: err.message });
        console.error(err);
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
                    className={`${
                      activeFilter === "Username" ? "active" : ""
                    } ${up === "Username" ? "up" : ""}`}
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
                    className={`${
                      activeFilter === "Registration" ? "active" : ""
                    } ${up === "Registration" ? "up" : ""}`}
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
                      user.banned.status
                        ? "bannedUser"
                        : user.admin.isAdmin
                        ? "adminUser"
                        : ""
                    }`}
                  >
                    <td>
                      <Link
                        to={{ pathname: `/admin/user/${user._id}` }}
                        className={"title"}
                      >
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
                          <Button
                            onClick={() => this.toggle(user)}
                            text="Unban"
                            type="Subscribe"
                          />
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
              change={(pageSize, currentPage) =>
                this.pagination(pageSize, currentPage)
              }
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
