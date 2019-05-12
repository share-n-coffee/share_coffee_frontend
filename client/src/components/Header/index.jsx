import React, { Component } from "react";
import logo from "./logo-coffee.png";
import styles from "./styles.module.scss";

class Header extends Component {
  render() {
    return (
      <div className={`${styles.wrapper} ${styles.header}`}>
        <img src={logo} className={styles.logo_header} alt="coffee" />
      </div>
    );
  }
}

export default Header;
