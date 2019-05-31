import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorMessage from "../../../components/ErrorMessage";
import Pagination from "../../../components/Pagination";
import { Link } from "react-router-dom";
import { request } from "../../../helpers/requests";
import * as URL from "../../../constants";
import SpinButton from "../../../common/SpinButton";
//import { Loading } from "../../../ui/components/Loader";
//import Button from "../../../common/Button";

class UserDepartment extends Component {
  state = {
    title: "",
  };

  componentDidMount() {
    if (this.props.id) {
      request.get(URL.ONE_TEAM(this.props.id)).then(data => {
        if (data.object) {
          this.setState({
            title: data.object.data.title,
          });
        } else this.setState({ title: `Did't choose a team` });
      });
    } else this.setState({ title: `Did't choose a team` });
  }

  render() {
    return <span>{this.state.title}</span>;
  }
}

class Users extends Component {
  state = {
    users: [],
    unsortedUser: [],
    userLength: 0,
    banned: false,
    activeFilter: "",
    up: "",
    userId: "",
    curPage: 1,
    isLoading: "",
    isLoadData: false,
    pageCount: 1,
    curDep: "",
    sortBy: "created_desc",
  };

  componentDidMount() {
    this.getData();
  }

  getData(page = 0, sortBy = "created_desc", limit = 10) {
    this.setState({ isLoadData: true });
    request.get(URL.USERS(page, limit, sortBy)).then(data => {
      this.setState({
        users: data.object.data,
        unsortedUser: data.object.data,
        userLength: data.object.data.length,
        pageCount: data.object.pages.total,
        error: data.message,
        isLoadData: false,
      });
    });
  }

  toggle = user => {
    const status = {
      ban: {
        status: !user.banned.status,
      },
    };
    this.setState({
      isLoading: user._id,
    });

    request.put(URL.BAN_USER(user._id), status).then(data => {
      this.getData();
      this.setState({
        error: data.message,
        isLoading: "",
      });
    });
  };

  pagination(currentPage) {
    this.setState({
      currentPage: currentPage,
    });
    this.getData(currentPage - 1, this.state.sortBy);
  }

  timestamp = createdTime => {
    let date = new Date(createdTime);
    let years = date.getFullYear();
    let months = "0" + (date.getMonth() + 1);
    let days = "0" + date.getDate();
    return days.substr(-2) + "." + months.substr(-2) + "." + years;
  };

  filter = filter => {
    let sortBy = filter + "_desc";
    this.setState({
      activeFilter: filter,
    });
    if (this.state.activeFilter === filter) {
      this.setState({
        up: filter,
      });
      sortBy = filter + "_desc";
    } else {
      this.setState({
        up: "",
      });
      sortBy = filter + "_asc";
    }
    if (this.state.up === filter) {
      this.setState({
        up: "",
      });
      sortBy = filter + "_asc";
    }

    this.setState({
      sortBy: sortBy,
    });

    this.getData(this.state.currentPage - 1, sortBy);
  };

  render() {
    const { users, activeFilter, up, error, pageCount, isLoading } = this.state;
    return (
      <div>
        {users && users.length > 0 ? (
          <div>
            <table className={"user_block"}>
              <thead>
                <tr>
                  <th
                    className={`${activeFilter === "username" ? "active" : ""} ${
                      up === "username" ? "up" : ""
                    }`}
                    onClick={() => this.filter("username")}
                  >
                    Username
                  </th>
                  <th
                    className={`${activeFilter === "department" ? "active" : ""} ${
                      up === "department" ? "up" : ""
                    }`}
                    onClick={() => this.filter("department")}
                  >
                    Team
                  </th>
                  <th
                    className={`${activeFilter === "created" ? "active" : ""} ${
                      up === "created" ? "up" : ""
                    }`}
                    onClick={() => this.filter("created")}
                    colSpan={2}
                  >
                    Registration Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map(
                  user =>
                    (user.username || user.firstName) && (
                      <tr
                        key={user._id}
                        className={`${
                          user.admin.permission !== 0
                            ? "adminUser"
                            : user.banned.status && "bannedUser"
                        }`}
                      >
                        <td>
                          <Link to={{ pathname: `/admin/user/${user._id}` }} className={"title"}>
                            <span className={"username"}>
                              {user.username ? user.username : `user (${user.firstName})`}
                            </span>
                          </Link>
                        </td>
                        <td>
                          <UserDepartment id={user.department} />
                        </td>
                        <td>{user.created ? this.timestamp(user.created) : "No date"}</td>
                        {user.admin.permission === 0 ? (
                          <td>
                            {!user.banned.status ? (
                              <SpinButton
                                onClick={() => this.toggle(user)}
                                text="Ban User"
                                isLoading={isLoading === user._id}
                                type="Unsubscribe"
                              />
                            ) : (
                              <SpinButton
                                onClick={() => this.toggle(user)}
                                text="Unban"
                                type="Subscribe"
                                isLoading={isLoading === user._id}
                              />
                            )}
                          </td>
                        ) : (
                          <td>ADMIN</td>
                        )}
                      </tr>
                    ),
                )}
              </tbody>
            </table>
            <Pagination
              pageCount={pageCount}
              change={currentPage => this.pagination(currentPage)}
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

Users.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.object,
  dispatch: PropTypes.func,
};
export default Users;
