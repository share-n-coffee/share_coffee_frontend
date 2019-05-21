import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div className="login_container">
        <h1>404</h1>
        <h2>Page not found</h2>
        <Link to="/" className="btn">
          Home
        </Link>
      </div>
    );
  }
}

export default NotFound;
