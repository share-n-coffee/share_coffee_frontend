import React, { Component } from "react";
import PropTypes from "prop-types";
import md5 from "js-md5";
import ErrorMessage from "../../components/ErrorMessage";
import { request } from "../../helpers/requests";
import SpinButton from "../../common/SpinButton";
import { setCookie } from "tiny-cookie";
import jwtDecode from "jwt-decode";
import { setStorage } from "../../helpers/helpers";
import * as URL from "../../constants";
import Header from "../../common/Header";

class AdminLoginPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    username: "",
    password: "",
    error: "",
    isLoading: false,
  };

  login = e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const user = {
      username: this.state.username,
      password: md5(this.state.password),
    };

    request.post(URL.LOGIN_ADMIN, user, false).then(data => {
      if (!data.message) {
        if (data.object.token) {
          const date = new Date(jwtDecode(data.object.token).exp * 1000).toGMTString();
          setCookie("token", data.object.token, { expires: date });
          setStorage(jwtDecode(`${data.object.token}`));
          this.props.setLogin();
          this.setState({ isLoading: false });
        }
      } else {
        this.setState({
          error: data.message,
          isLoading: false,
        });
      }
    });
  };

  changeInput = (title, value) => {
    this.setState({ [title]: value });
  };

  render() {
    const { error, isLoading } = this.state;

    return (
      <>
        <Header isActive={false} isAdmin={"2"} hasDepartment={false} location={this.props} />
        <div className="login_container" style={{ width: "100%" }}>
          <h1 className="main__header">Admin panel</h1>
          <div className="shadow_container" />
          <div className="form-page__wrapper login_container">
            <form className="form">
              {error ? <ErrorMessage error={error} /> : null}
              <input
                className="form__field-input"
                type="text"
                onChange={e => this.changeInput("username", e.target.value)}
                placeholder="Username"
              />

              <input
                className="form__field-input"
                type="password"
                onChange={e => this.changeInput("password", e.target.value)}
                placeholder="Password"
              />

              <SpinButton onClick={e => this.login(e)} text="Log in" isLoading={isLoading} />
            </form>
          </div>
        </div>
      </>
    );
  }
}

AdminLoginPage.propTypes = {
  history: PropTypes.object,
};

export default AdminLoginPage;
