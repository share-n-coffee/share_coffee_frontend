import React from "react";
import Proptypes from "prop-types";
import { Button } from "../../../components/Button";

const Topics = ({ user, toggleAdmin, toggleBan }) => {
    return (
        <div key={user._id} className="user-info__container">
            <img src={`${user.avatar ? user.avatar : require("../../../assets/img/logo.png")}`} alt="user avatar" />
            <div className={"info"}>
                <p>
                    <b>Username: </b>
                    {user.username}{" "}
                </p>
                <p>
                    <b>FIO: </b> {user.firstName + " " + (user.lastName !== null ? user.lastName : "")}
                </p>
                <p>
                    <b>Team: </b>
                    {user.department && user.department.title ? `${user.department.title}` : "Did't choose a team"}{" "}
                </p>
            </div>

            <div>
                {user.admin && user.admin.permission !== 2 ? (
                    user.admin && user.admin.permission === 0 ? (
                        <div>
                            <div>
                                {user.banned && !user.banned.status ? (
                                    <Button onClick={() => toggleBan(user)} text="Ban User" type="Unsubscribe" />
                                ) : (
                                    <Button onClick={() => toggleBan(user)} text="Unban" type="Subscribe" />
                                )}
                            </div>
                            {user.banned && !user.banned.status && (
                                <Button onClick={() => toggleAdmin(user)} text="add to admin" type="Subscribe" />
                            )}
                        </div>
                    ) : (
                        <Button onClick={() => toggleAdmin(user)} text="Delete from admin" type="Subscribe" />
                    )
                ) : (
                    "Super Admin"
                )}
            </div>
        </div>
    );
};

Topics.propTypes = {
    toggleAdmin: Proptypes.func,
    toggleBan: Proptypes.func,
    user: Proptypes.shape({
        _id: Proptypes.string,
        username: Proptypes.string,
        avatar: Proptypes.string,
        admin: Proptypes.shape({
            permission: Proptypes.number
        }),
        banned: Proptypes.shape({
            status: Proptypes.bool
        }),
        firstName: Proptypes.string,
        lastName: Proptypes.string,
        department: Proptypes.shape({
            title: Proptypes.string
        })
    })
};

export default Topics;
