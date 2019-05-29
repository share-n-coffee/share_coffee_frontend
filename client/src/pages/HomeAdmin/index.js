import React from "react";
import HomeDashboard from "./home";
import { Redirect } from "react-router";
import Header from "../../common/Header";
import { getCookie } from "tiny-cookie";
import Preloader from "../../modules/Preloader";
import axios from "axios";
import { GET_USER } from "../../constants/";
import { setStorage } from "../../helpers/helpers";
import jwtDecode from "jwt-decode";

class HomeAdmin extends React.Component {
  state = {
    isLogin: 0,
    loading: true,
  };

  async componentWillMount() {
    const token = getCookie("token");
    const id = sessionStorage.getItem("id");

    const result = await axios({
      url: GET_USER(id),
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
      });
    await this.setState({
      isLogin: result.data.data.admin.permission,
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="preloader-body">
          <Preloader />
        </div>
      );
    }

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
          <HomeDashboard history={this.props.history} location={this.props.location} />
        </div>
      </>
    ) : (
      <Redirect to="/404" />
    );
  }
}

export default HomeAdmin;
