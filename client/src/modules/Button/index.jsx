import React from "react";
import styles from "./styles.module.scss";

const Button = props => {
  const { text, handlerClick } = props;
  return (
    <button className={`${styles.section__btn}`} onClick={handlerClick}>
      {text}
    </button>
  );
};
export default Button;
