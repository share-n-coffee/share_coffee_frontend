import React, { Component } from "react";
import john from "../../assets/img/john.gif";
import Header from "../../common/Header";
import Button from "../../common/Button";

class NotFound extends Component {
  render() {
    // const isActive = sessionStorage.length > 2 ? true : false;
    // const isAdmin = isActive && sessionStorage.getItem("isAdmin") === "true" ? true : false;
    // const hasDepartment =
    //   isActive &&
    //   sessionStorage.getItem("department") !== "undefined" &&
    //   sessionStorage.getItem("department") !== null
    //     ? true
    //     : false;
    return (
      <>
        <Header
        // isActive={isActive}
        // isAdmin={isAdmin}
        // hasDepartment={hasDepartment}
        // avatar={sessionStorage.getItem("avatar")}
        // name={`${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}`}
        />
        <div className="notfound_container">
          <div className="login_container">
            <h1>404</h1>
            <h2>Page not found</h2>
            <div className="btn_container">
              <Button
                text={"Home"}
                onClick={() => {
                  window.location.replace("/");
                }}
              />
            </div>
            <div className="gif__container">
              <span className="redux_txt">Redux</span>
              <span className="tests_txt">Tests</span>
              <img src={john} className="gif" alt="john" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NotFound;
