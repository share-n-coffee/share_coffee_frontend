import React, { Component } from "react";
import john from "../../assets/img/john.gif";
import Header from "../../common/Header";
import Button from "../../common/Button";

class NotFound extends Component {
  render() {
    return (
      <>
        <Header />
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
