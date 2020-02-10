import React, { Component } from "react";

class SectionInfo extends Component {
  render() {
    const { infoText } = this.props;

    return (
      <div className="section__info">
        <span>{infoText}</span>
      </div>
    );
  }
}

export default SectionInfo;
