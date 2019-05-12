import React, { Component } from "react";
import styles from "./styles.module.scss";

class Button extends Component {
  render() {
    const { link, text } = this.props;

    return (
      <div className={styles.section}>
        <a href={link}>
          <button className={styles.section__btn}>{text}</button>
        </a>
      </div>
    );
  }
}
export default Button;
