import React from "react";
import HomeDashboard from "./home";
import { Redirect } from "react-router";
import Header from "../../common/Header";
import { getCookie } from "tiny-cookie";
import { setStorage } from "../LoginPage/helpers";
import jwtDecode from "jwt-decode";

class HomeAdmin extends React.Component {
  state = {
    isLogin: false,
  };

  componentDidMount() {
    const token = getCookie("token");
    const id = sessionStorage.getItem("id");
    const checkAdmin = null; //сделать запрос к базе по полю админ:
    //https://documenter.getpostman.com/view/7419944/S1TSXdzx?version=latest#b0a99c3e-90ec-447a-a996-eb552bab3e4b
    //проверить результат
    if (checkAdmin) {
      this.setState({ isLogin: true });
    }
  }

  setLogin = (state, data) => {
    this.setState({ isLogin: state });
    setStorage(jwtDecode(data));
  };

  render() {
    return this.state.isLogin ? (
      <>
        <Header
          isActive={false}
          isAdmin={true}
          hasDepartment={false}
          location={this.props}
          avatar={sessionStorage.getItem("avatar")}
          name={`${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}`}
        />
        <div className="login_container" style={{ width: "100%" }}>
          <h1>Admin panel</h1>
          <HomeDashboard history={this.props.history} />
        </div>
      </>
    ) : (
      <Redirect to="/404" />
    );
  }
}

export default HomeAdmin;
