import React from "react";
import PropTypes from "prop-types";
import logo from "./logo.png";
import defaultUser from "./defaultUser.png";
import styles from "./styles.module.scss";
import Button from "../Button";
import EventsDropDown from "../../components/EventsDropdown";
import { remove } from "tiny-cookie";
//testData
// const avatar = "https://t.me/i/userpic/320/MxmMazovsky.jpg";
// const name = "Max Razhnov";

const events = [
  { name: "name1", place: "place1", time: "1st September" },
  { name: "name2", place: "place2", time: "1st September" },
];
//

const logOut = props => {
  sessionStorage.clear();
  // not work remove
  remove("token", {
    domain: "http://random-coffee.fun",
  });
  //
  props.location.replace("/");
};

const adminNavigation = props => {
  let { avatar } = props;
  if (avatar === "undefined") {
    avatar = defaultUser;
  }
  return (
    <div className={styles.nav}>
      <img className={styles.user__img} src={avatar} alt="avatar" />
      <span className={styles.user__info}>{props.name}</span>
      <Button text={"Log out"} type="logout" onClick={() => logOut(props)} />
    </div>
  );
};

const userNavigation = props => {
  let { avatar } = props;
  if (avatar === "undefined") {
    avatar = defaultUser;
  }
  return (
    <>
      {props.hasDepartment ? (
        <div>
          <div className={styles.nav}>
            <img className={styles.user__img} src={avatar} alt="avatar" />
            <span className={styles.user__info}> {props.name}</span>
            <Button text={"Log out "} type="logout" onClick={() => logOut(props)} />
          </div>
          <div className={styles.header__dropdown}>
            <EventsDropDown events={events} />
          </div>
        </div>
      ) : (
        <div className={styles.nav}>
          <Button text={"Log out "} type="logout" onClick={() => logOut(props)} />
        </div>
      )}
    </>
  );
};

const Header = props => {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.logo_header}>
          <img src={logo} alt="coffee" />
          <span>SHARE & COFFEE</span>
        </div>
        {props.isActive ? (
          <>{props.isAdmin ? adminNavigation(props) : userNavigation(props)}</>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  isActive: PropTypes.bool,
  isAdmin: PropTypes.bool,
  hasDepartment: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.object,
};

export default Header;
