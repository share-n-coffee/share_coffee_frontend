import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import logo from "../../assets/img/logo.svg";
import defaultUser from "../../assets/img/defaultUser.png";
import Button from "../Button";
import EventsDropDown from "../../components/EventsDropdown";

import { removeCookie } from "tiny-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCookie } from "tiny-cookie";
import { checkerNone, checkerProp } from "../../helpers/helpers";

// static
const events = [
  {
    title: "Platform Front-end",
    name: "@ Latte Python ",
    place: "12 Zybitskaya St., Minsk",
    time: "22.04.2019 - 16:00",
  },
  {
    title: "Platform Back-end",
    name: "@ Latte Python ",
    place: "12 Zybitskaya St., Minsk",
    time: "22.04.2019 - 16:00",
  },
  {
    title: "CG & Motion Design",
    name: "@ Latte Python ",
    place: "12 Zybitskaya St., Minsk",
    time: "22.04.2019 - 16:00",
  },
];
//
const getUpcomingEvents = userId => {
  const token = getCookie("token");
  const obj = {
    method: "get",
    url: `https://forgeserver.herokuapp.com/api/users/${userId}/upcoming`,
    headers: {
      Authorization: `Bearer ${token}`,
      mode: "cors",
      "Content-Type": "application/json",
    },
  };
  return axios(obj)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

const logOut = props => {
  const { location } = props;
  sessionStorage.clear();
  removeCookie("token", {
    domain: "random-coffee.fun",
  });
  location.history.replace("/");
};

const checkListSuperAdmin = () => {
  if (
    (sessionStorage.getItem("avatar") === "undefined" ||
      sessionStorage.getItem("avatar") === null) &&
    (sessionStorage.getItem("firstName") === null ||
      sessionStorage.getItem("firstName") === "undefined") &&
    (sessionStorage.getItem("lastName") === null ||
      sessionStorage.getItem("lastName") === "undefined")
  ) {
    return true;
  } else {
    return false;
  }
};

const adminNavigation = props => {
  let { avatar, name } = props;
  if (checkerProp(avatar)) {
    avatar = defaultUser;
  }
  if (checkListSuperAdmin()) {
    name = "Admin";
  }
  return (
    <>
      <div className="header-nav">
        {sessionStorage.getItem("firstName") !== null &&
        sessionStorage.getItem("lastName") !== null ? (
          <Button
            text="User"
            type="logout"
            onClick={() => {
              props.location.history.replace(`/subscriptions`);
            }}
          />
        ) : (
          <></>
        )}
        <img className="header-user__img" src={avatar} alt="avatar" />
        <span className="header-user__info">{name}</span>
        <Button text="Log out" type="logout" onClick={() => logOut(props)} />
      </div>
    </>
  );
};

const userNavigation = (props, userEvents) => {
  let { avatar, name } = props;
  if (checkerProp(avatar)) {
    avatar = defaultUser;
  }
  console.log(name);
  if (checkerProp(name)) {
    name = "user";
  }
  return (
    <>
      {props.hasDepartment ? (
        <div>
          <div className="header-nav">
            {sessionStorage.getItem("isAdmin") === "1" ? (
              <Button
                text="Admin"
                type="logout"
                onClick={() => {
                  props.location.history.replace(`/admin`);
                }}
              />
            ) : (
              <></>
            )}
            <img className="header-user__img" src={avatar} alt="avatar" />
            <span className="header-user__info"> {name}</span>
            <Button text={"Log out"} type="logout" onClick={() => logOut(props)} />
          </div>
          <div className="header__dropdown">
            <EventsDropDown events={userEvents} />
          </div>
        </div>
      ) : (
        <div className="header-nav">
          <Button text={"Log out "} type="logout" onClick={() => logOut(props)} />
        </div>
      )}
    </>
  );
};

const Header = props => {
  const hasId = checkerProp(sessionStorage.getItem("id"));
  const [userEvents, setUserEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasId) {
        const result = await getUpcomingEvents(sessionStorage.getItem("id"));
        setUserEvents(result.data.data);
      } else {
        setUserEvents([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="header">
      <div className="header__container">
        <div className="logo_header">
          <Link to="/" title="Home">
            <img src={logo} alt="coffee" />
          </Link>
          <span>SHARE & COFFEE</span>
        </div>
        {props.isActive ? (
          <>
            {props.isAdmin === "2"
              ? adminNavigation(props)
              : // `${props.isAdmin === "1" ? userNavigation()}`
                userNavigation(props, userEvents)}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  isActive: PropTypes.bool,
  isAdmin: PropTypes.string,
  hasDepartment: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
};

export default Header;
