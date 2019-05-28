import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorMessage from "../../../components/ErrorMessage";
import Pagination from "../../../components/Pagination";
import { Link } from "react-router-dom";
import { request } from "../../../helpers/requests";
import * as URL from "../../../constants";
import SpinButton from "../../../common/SpinButton";
import { Loading } from "../../../ui/components/Loader";

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
    isLoading: "",
    isLoadData: false,
    pageCount: 1,
  };

  componentDidMount() {
    this.getData();
  }

  getData(page = 0, limit = 2) {
    this.setState({ isLoadData: true });
    request.get(URL.USERS(page, limit)).then(data => {
      console.log(data);
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
    this.getData(currentPage - 1);
  }

  timestamp = createdTime => {
    let date = new Date(createdTime);
    let years = date.getFullYear();
    let months = "0" + (date.getMonth() + 1);
    let days = "0" + date.getDate();
    return days.substr(-2) + "." + months.substr(-2) + "." + years;
  };

  sort = field => {
    let sortOrder = 1;

    if (field[0] === "-") {
      sortOrder = -1;
      field = field.substr(1);
    }

    return function(a, b) {
      const isNumber = Number.isInteger(a[field]);

      if (typeof a[field] === "undefined" || typeof b[field] === "undefined") return -1;

      if (sortOrder == -1) {
        if (isNumber) {
          return b[field] - a[field];
        } else {
          return b[field].localeCompare(a[field]);
        }
      } else {
        if (isNumber) {
          return a[field] - b[field];
        } else {
          return a[field].localeCompare(b[field]);
        }
      }
    };
  };

  filter = filter => {
    this.setState({
      activeFilter: filter,
    });
    if (this.state.activeFilter === filter) {
      this.setState({
        up: filter,
        users: this.state.unsortedUser.sort(this.sort("-" + filter)),
      });
    } else {
      this.setState({
        up: "",
        users: this.state.unsortedUser.sort(this.sort(filter)),
      });
    }
    if (this.state.up === filter) {
      this.setState({
        up: "",
        users: this.state.unsortedUser.sort(this.sort(filter)),
      });
    }
  };

  render() {
    const { users, activeFilter, up, error, pageCount, isLoading, isLoadData } = this.state;
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
                {users.map(user => (
                  <tr
                    key={user._id}
                    // className={`${
                    //   user.banned.status
                    //     ? "bannedUser"
                    //     : user.admin.permission !== 0
                    //     ? "adminUser"
                    //     : ""
                    // }`}
                  >
                    <td>
                      <Link to={{ pathname: `/admin/user/${user._id}` }} className={"title"}>
                        <span className={"username"}>{user.username}</span>
                      </Link>
                    </td>
                    {/*<td>{user.department}</td>*/}
                    {/*<td>{this.timestamp(user.created)}</td>*/}
                    {/*{user.admin.permission === 0 ? (*/}
                    {/*<td>*/}
                    {/*{!user.banned.status ? (*/}
                    {/*<SpinButton*/}
                    {/*onClick={() => this.toggle(user)}*/}
                    {/*text="Ban User"*/}
                    {/*isLoading={isLoading === user._id}*/}
                    {/*type="Unsubscribe"*/}
                    {/*/>*/}
                    {/*) : (*/}
                    {/*<SpinButton*/}
                    {/*onClick={() => this.toggle(user)}*/}
                    {/*text="Unban"*/}
                    {/*type="Subscribe"*/}
                    {/*isLoading={isLoading === user._id}*/}
                    {/*/>*/}
                    {/*)}*/}
                    {/*</td>*/}
                    {/*) : (*/}
                    {/*<td>ADMIN</td>*/}
                    {/*)}*/}
                  </tr>
                ))}
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

Topics.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Topics;
