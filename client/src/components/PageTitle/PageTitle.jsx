import React, { Component } from "react";
import "./PageTitle.css";

class PageTitle extends Component {
  render() {
    const { title, desc } = this.props;
    return (
      <div className="wrapper main">
        <h1 className="main__header">{title}</h1>
        <p className="main__description">{desc}</p>
      </div>
    );
  }
}

export default PageTitle;
