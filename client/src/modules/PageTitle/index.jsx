import React, { Component } from "react";
import styles from "./styles.module.scss";

class PageTitle extends Component {
  render() {
    const { title, desc, mouseOver, mouseOut, click } = this.props;
    let styleCheck = mouseOver
      ? styles.main__header__link
      : styles.main__header;
    return (
      <>
        <div className={styles.main}>
          <h1
            className={styleCheck}
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
            onClick={click}
          >
            {title}
          </h1>
          <p className={styles.main__description}>{desc}</p>
        </div>
        <div className={styles.shadow_container} />
      </>
    );
  }
}

export default PageTitle;
