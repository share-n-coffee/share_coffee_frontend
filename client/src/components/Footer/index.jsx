import React, { Component } from "react";
import styles from "./styles.module.scss";
class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        <span className={styles.footer__title}>© 2019 Wargaming.net</span>
      </div>
    );
  }
}

export default Footer;
