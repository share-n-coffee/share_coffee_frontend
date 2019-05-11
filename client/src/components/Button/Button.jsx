import React, { Component } from "react";
import "./Button.css";

class Button extends Component {
  render() {
    const { link, text } = this.props;

    return (
      <div className="wrapper section">
        <button href={link} className="section__btn">
          {text}
        </button>
      </div>
    );
  }
}
export default Button;
