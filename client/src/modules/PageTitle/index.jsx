import React, { Component } from "react";
import styles from "./styles.module.scss";

class PageTitle extends Component {
  render() {
    const { title, desc } = this.props;
    return (
      <div className={`${styles.main} ${styles.wrapper}`}>
        <h1 className={styles.main__header}>{title}</h1>
        <p className={styles.main__description}>{desc}</p>
      </div>
    );
  }
}

export default PageTitle;
