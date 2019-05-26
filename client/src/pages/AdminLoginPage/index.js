import React, { Component } from "react";
import PropTypes from "prop-types";
import md5 from "js-md5";
import ErrorMessage from "../../components/ErrorMessage";
import Button from "../../common/Button";
import { request } from "../../helpers/requests";

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

    request.post(requestUrl, user).then(data => {
      if (!data.message) {
        if (data.object.token) {
          sessionStorage.setItem("adminToken", data.object.token);
          this.props.setLogin(data.object.token != null);
        }
      } else {
        this.setState({ error: data.message });
      }
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
