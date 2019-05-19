import React, { Component } from "react";
import logo from "./logo-coffee.png";
import styles from "./styles.module.scss";
import Button from "../Button";
import Dropdown from "../../components/Dropdown";
class Header extends Component {
  render() {
    //check if user login
    const isActive = false;
    //
    const avatar = "https://t.me/i/userpic/320/MxmMazovsky.jpg";
    const name = "FullStack921";
    const navBlock = () => {
      return (
        <div>
          <div className={styles.nav}>
            <img className={styles.user__img} src={avatar} alt="avatar" />
            <span className={styles.user__info}>{name}</span>
            <Button text={"Log out "} className={styles.btn_logout_style} />
          </div>
          <div className={styles.header__dropdown}>
            <Dropdown />
          </div>
        </div>
      );
    };

    return (
      <div className={`${styles.wrapper} ${styles.header}`}>
        <div className={styles.header__container}>
          <img src={logo} className={styles.logo_header} alt="coffee" />
          {isActive ? navBlock() : <div />}
        </div>
      </div>
    );
  }
}

export default Header;
