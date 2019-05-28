import React from "react";
import AdminLoginPage from "../AdminLoginPage";
import HomeDashboard from "./home";
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
    if (token !== null) {
      this.setState({ isLogin: true });
    }
  }

  setLogin = (state, data) => {
    this.setState({ isLogin: state });
    setStorage(jwtDecode(data));
  };

  render() {
    console.log(this.state.currentPage);
    return (
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
          {!this.state.isLogin ? (
            <AdminLoginPage history={this.props.history} setLogin={this.setLogin} />
          ) : (
            <HomeDashboard history={this.props.history} location={this.props.location} />
          )}
        </div>
      </>
    );
  }
}

export default HomeAdmin;
