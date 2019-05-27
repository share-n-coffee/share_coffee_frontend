import React, { Component } from "react";

class InfoAboutEvent extends Component {
  render() {
    const { adress, eventFrequency } = this.props;

    return (
      <div className="info-About-Event">
        <div className="info-row">
          <p className="info-title">Place:</p>
          <span>{adress}</span>
        </div>
        <div className="info-row">
          <p className="info-title">Time:</p>
          <span className="time-desc">{eventFrequency}</span>
        </div>
      </div>
    );
  }
}

export default InfoAboutEvent;
