import React, { Component } from "react";
import PropTypes from "prop-types";
import md5 from "js-md5";
import ErrorMessage from "../../components/ErrorMessage";
import Button from "../../common/Button";
import Header from "../../common/Header";

class AdminLoginPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: "",
    password: "",
    error: "",
  };

  login = e => {
    e.preventDefault();
    const requestUrl = `https://forge-development.herokuapp.com/login/admin`;

    const user = {
      username: this.state.username,
      password: md5(this.state.password),
    };

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjZGU4YjEwNDhlZjI3YTI1MWY2NWRkYyIsInRlbGVncmFtVXNlcklkIjo1NDE0MTk0MzEsImFkbWluIjp7ImlzQWRtaW4iOnRydWUsInBhc3N3b3JkIjoidGVzdCJ9fSwiaWF0IjoxNTU4MTc5Nzc4LCJleHAiOjE1NTgyNjYxNzh9.YESFpIbsN_-Hyu9Q0bo8mwhU_Ur9BbdbmudiJpLVea8";

    fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify(user),
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log(data);
        if (data.errors && data.errors.length > 0) {
          this.setState({ error: data.errors[0].msg });
        }
        if (data.token) {
          localStorage.setItem("adminToken", data.token);
          this.props.setLogin(token != null);
        }
      })
      .catch(err => {
        this.setState({ error: err.message });
        console.error(err);
      });
  };

  changeInput = (title, value) => {
    this.setState({ [title]: value });
  };

  render() {
    const { error } = this.state;

    return (
      <div className="form-page__wrapper login_container">
        <h2 className="form-page__form-heading">Please Login In</h2>
        <form className="form">
          {error ? <ErrorMessage error={error} /> : null}
          <input
            className="form__field-input"
            type="text"
            onChange={e => this.changeInput("username", e.target.value)}
            placeholder="username"
          />

          <input
            className="form__field-input"
            type="password"
            onChange={e => this.changeInput("password", e.target.value)}
            placeholder="password"
          />

          <Button onClick={e => this.login(e)} text="Log in" />
        </form>
      </div>
    );
  }
}

AdminLoginPage.propTypes = {
  history: PropTypes.object,
};

export default AdminLoginPage;
