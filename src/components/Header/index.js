import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import logo from "../../assets/img/logo.svg";
import defaultUser from "../../assets/img/defaultUser.png";
import { Button } from "../Button";
import EventsDropDown from "../EventsDropdown";
import { SERVER } from "../../constants";
import { removeCookie, getCookie } from "tiny-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import { checkerProp } from "../../helpers/helpers";

const getUpcomingEvents = userId => {
    const token = getCookie("token");
    const obj = {
        method: "get",
        url: `${SERVER}/users/${userId}/upcoming`,
        headers: {
            Authorization: `Bearer ${token}`,
            mode: "cors",
            "Content-Type": "application/json"
        }
    };
    return axios(obj)
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err);
            return err;
        });
};

const logOut = location => {
    sessionStorage.clear();
    removeCookie("token", {
        domain: "random-coffee.fun"
    });
    location.history.replace("/");
};

const AdminNavigation = ({ avatar, name, location }) => {
    // if (checkerProp(avatar)) {
    //     avatar = defaultUser;
    // }
    // if (checkListSuperAdmin()) {
    //     name = "Admin";
    // }
    return (
        <div className="header-nav">
            <img className="header-user__img" src={avatar} alt="avatar" />
            <span className="header-user__info">{name}</span>
            <Button text="Log out" type="logout" onClick={() => logOut(location)} />
        </div>
    );
};

const UserNavigation = ({ avatar, name, surName, userEvents, location, hasDepartment }) => {
    // if (checkerProp(avatar)) {
    //     avatar = defaultUser;
    // }
    let fullName = `${name} ${surName}`;
    if (checkerProp(name) || checkerProp(surName)) {
        fullName = "user";
    }
    return (
        <Fragment>
            {hasDepartment ? (
                <div>
                    <div className="header-nav">
                        <img className="header-user__img" src={avatar} alt="avatar" />
                        <span className="header-user__info">{fullName}</span>
                        <Button text={"Log out"} type="logout" onClick={() => logOut(location)} />
                    </div>
                    <div className="header__dropdown">
                        <EventsDropDown events={userEvents} />
                    </div>
                </div>
            ) : (
                <div className="header-nav">
                    <Button text={"Log out "} type="logout" onClick={() => logOut(location)} />
                </div>
            )}
        </Fragment>
    );
};

const Header = ({ name, isActive, avatar, surName, location, isAdmin, hasDepartment }) => {
    const [userEvents, setUserEvents] = useState([]);
    useEffect(() => {
        const hasId = checkerProp(sessionStorage.getItem("id"));
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
                {isActive ? (
                    <Fragment>
                        {isAdmin === "2" ? (
                            <AdminNavigation name={name} avatar={avatar} location={location} />
                        ) : (
                            // `${props.isAdmin === "1" ? userNavigation()}`
                            <UserNavigation
                                hasDepartment={hasDepartment}
                                name={name}
                                avatar={avatar}
                                surName={surName}
                                location={location}
                                userEvents={userEvents}
                            />
                        )}
                    </Fragment>
                ) : null}
            </div>
        </div>
    );
};

AdminNavigation.propTypes = {
    location: PropTypes.object,
    avatar: PropTypes.string,
    name: PropTypes.string
};

AdminNavigation.defaultProps = {
    avatar: defaultUser,
    name: "Admin"
};

UserNavigation.propTypes = {
    ...AdminNavigation.propTypes,
    surName: PropTypes.string,
    userEvents: PropTypes.array,
    hasDepartment: PropTypes.bool
};

UserNavigation.defaultProp = {
    avatar: defaultUser
};

Header.propTypes = {
    ...UserNavigation.propTypes,
    isActive: PropTypes.bool,
    isAdmin: PropTypes.string
};

export default Header;
