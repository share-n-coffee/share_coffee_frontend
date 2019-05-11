import React, { Component } from "react";
import "./PageTitle.css";

class PageTitle extends Component {
  render() {
    return (
      <div className="wrapper main">
        <h1 className="main__header">{this.props.title}</h1>
        <p className="main__description">{this.props.desc}</p>
      </div>
    );
  }
}

export default PageTitle;
