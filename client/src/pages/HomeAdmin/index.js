import React from "react";
import AdminLoginPage from "../AdminLoginPage";
import HomeDashboard from "./home";
// import Navbar from "../../components/Navbar";
import Header from "../../common/Header";

class HomeAdmin extends React.Component {
  state = {
    isLogin: false,
  };

  componentDidMount() {
    const token = sessionStorage.getItem("adminToken");
    if (token !== null) {
      this.setState({ isLogin: true });
    }
  }

  setLogin = state => {
    this.setState({ isLogin: state });
  };

  render() {
    return (
      <>
        <Header
          isActive={true}
          isAdmin={true}
          hasDepartment={false}
          location={this.props}
          avatar={sessionStorage.getItem("avatar")}
          name={`${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}`}
        />
        <div className="login_container" style={{ width: "100%" }}>
          {/*<Navbar setLogin={this.setLogin} isLogin={this.state.isLogin}/>*/}
          <h1>Admin panel</h1>
          {!this.state.isLogin ? (
            <AdminLoginPage history={this.props.history} setLogin={this.setLogin} />
          ) : (
            <HomeDashboard history={this.props.history} />
          )}
        </div>
      </>
    );
  }
}

export default HomeAdmin;
