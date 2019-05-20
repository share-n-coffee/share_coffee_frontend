import React, { Component } from "react";
import logo from "./logo-coffee.png";
import styles from "./styles.module.scss";
import Button from "../Button";
import EventsDropDown from "../../components/EventsDropdown";

class Header extends Component {
  render() {
    //check if user login
    const isActive = localStorage.getItem("id");
    //
    // test data
    const events = [
      { name: "name1", place: "place1", time: "1st September" },
      { name: "name2", place: "place2", time: "1st September" },
    ];
    const avatar = localStorage.getItem("avatar");
    const name = localStorage.getItem("firstName");
    //
    const getUserDataContainer = () => {
      return (
        <div>
          <div className={styles.nav}>
            <img className={styles.user__img} src={avatar} alt="avatar" />
            <span className={styles.user__info}>{name}</span>
            <Button text={"Log out "} className={styles.btn_logout_style} />
          </div>
          <div className={styles.header__dropdown}>
            <EventsDropDown events={events} />
          </div>
        </div>
      );
    };

    return (
      <div className={styles.header}>
        <div className={styles.header__container}>
          <img src={logo} className={styles.logo_header} alt="coffee" />
          {isActive && window.location.pathname !== "/"
            ? getUserDataContainer()
            : ""}
        </div>
      </div>
    );
  }
}

export default Header;
