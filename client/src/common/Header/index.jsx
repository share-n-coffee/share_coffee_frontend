import React from "react";
import PropTypes from "prop-types";
import logo from "../../assets/img/logo.png";
import defaultUser from "../../assets/img/defaultUser.png";
import Button from "../Button";
import EventsDropDown from "../../components/EventsDropdown";
import { removeCookie } from "tiny-cookie";
import { Link } from "react-router-dom";
//testData
// const avatar = "https://t.me/i/userpic/320/MxmMazovsky.jpg";
// const name = "Max Razhnov";

const events = [
  { name: "name1", place: "place1", time: "1st September" },
  { name: "name2", place: "place2", time: "1st September" },
];
//

const logOut = props => {
  const { location } = props;
  sessionStorage.clear();

  removeCookie("token", {
    domain: "random-coffee.fun",
  });
  location.history.replace("/");
};

const adminNavigation = props => {
  let { avatar } = props;
  if (avatar === "undefined") {
    avatar = defaultUser;
  }
  return (
    <>
      <div className="h-nav">
        <img className="h-user__img" src={avatar} alt="avatar" />
        <span className="h-user__info">{props.name}</span>
        <Button text="Log out" type="logout" onClick={() => logOut(props)} />
      </div>
    </>
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
          <div className="h-nav">
            {sessionStorage.getItem("isAdmin") === "true" ? (
              <Button
                text="Admin"
                type="logout"
                onClick={() => props.location.history.replace(`/admin`)}
              />
            ) : (
              <></>
            )}
            <img className="h-user__img" src={avatar} alt="avatar" />
            <span className="h-user__info"> {props.name}</span>
            <Button text={"Log out"} type="logout" onClick={() => logOut(props)} />
          </div>
          <div className="h-header__dropdown">
            <EventsDropDown events={events} />
          </div>
        </div>
      ) : (
        <div className="h-nav">
          <Button text={"Log out "} type="logout" onClick={() => logOut(props)} />
        </div>
      )}
    </>
  );
};

const Header = props => {
  return (
    <div className="h-header">
      <div className="h-header__container">
        <div className="h-logo_header">
          <Link to="/" title="Home">
            <img src={logo} alt="coffee" />
          </Link>
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
  name: PropTypes.string,
};

export default Header;
