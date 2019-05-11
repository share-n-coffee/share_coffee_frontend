import React, { Component } from "react";
import "./PageInfo.css";

class PageInfo extends Component {
  render() {
    return (
      <div className="wrapper page__info">
        <span>{this.props.infoText}</span>
      </div>
    );
  }
}

export default PageInfo;
