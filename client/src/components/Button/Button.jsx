import React, { Component } from "react";
import "./Button.css";

class Button extends Component {
  render() {
    const { link, text } = this.props;

    return (
      <div className="wrapper section">
        <a href={link}>
          <button className="section__btn">{text}</button>
        </a>
      </div>
    );
  }
}
export default Button;
