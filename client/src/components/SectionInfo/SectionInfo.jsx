import React, { Component } from "react";
import "./SectionInfo.css";

class SectionInfo extends Component {
  render() {
    const { infoText } = this.props;

    return (
      <div className="wrapper section__info">
        <span>{infoText}</span>
      </div>
    );
  }
}

export default SectionInfo;
