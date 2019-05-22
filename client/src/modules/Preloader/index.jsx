import React from "react";
import logo from "./logo.png";
import styles from "./styles.module.scss";

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.image__container}>
        <img src={logo} alt="wait" />
        <div className={styles.animation__container}>
          <div className={styles.animation} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
