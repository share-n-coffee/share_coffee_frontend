import React, { Component } from "react";
import logo from "./logo-coffee.png";
import styles from "./styles.module.scss";
import Button from "../Button";
import EventsDropDown from "../../components/EventsDropdown";
import { getCookie } from "tiny-cookie";

class Header extends Component {
  // state = {
  //   id: false,
  //   isAdmin: false,
  //   hasDepartment: false,
  //   name: null,
  //   avatar: null,
  // };

  render() {
    const id = sessionStorage.getItem("id") === null ? false : true;
    const isAdmin = sessionStorage.getItem("isAdmin") === "true" ? true : false;
    const hasDepartment =
      sessionStorage.getItem("department") === null ? false : true;
    const avatar = sessionStorage.getItem("avatar");
    const name = sessionStorage.getItem("firstName");

    // TEST DATA
    // this.forceUpdate(func);
    const events = [
      { name: "name1", place: "place1", time: "1st September" },
      { name: "name2", place: "place2", time: "1st September" },
    ];
    // const avatar = sessionStorage.getItem("avatar");
    // const name = sessionStorage.getItem("firstName");
    //
    // const id = true;
    // const isAdmin = false;
    // const hasDepartment = true;
    // const avatar = "https://t.me/i/userpic/320/MxmMazovsky.jpg";
    // const name = "Max Razhnov";

    const adminNavigation = () => {
      return (
        <div className={styles.nav}>
          <img className={styles.user__img} src={avatar} alt="avatar" />
          <span className={styles.user__info}> </span>
          <Button text={"Log out "} type="logout" />
        </div>
      );
    };

    const userNavigation = () => {
      return (
        <>
          {hasDepartment ? (
            <div>
              <div className={styles.nav}>
                <img className={styles.user__img} src={avatar} alt="avatar" />
                <span className={styles.user__info}> {name}</span>
                <Button text={"Log out "} type="logout" />
              </div>
              <div className={styles.header__dropdown}>
                <EventsDropDown events={events} />
              </div>
            </div>
          ) : (
            <div className={styles.nav}>
              <Button text={"Log out "} type="logout" />
            </div>
          )}
        </>
      );
    };

    return (
      <div className={styles.header}>
        <div className={styles.header__container}>
          <img src={logo} className={styles.logo_header} alt="coffee" />
          {id ? <>{isAdmin ? adminNavigation() : userNavigation()}</> : <></>}
        </div>
      </div>
    );
  }
}

export default Header;
