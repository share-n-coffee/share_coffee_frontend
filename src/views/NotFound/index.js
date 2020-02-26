import React, { Fragment } from "react";
import Header from "../../components/Header";
import { Button } from "../../components/Button";

const NotFound = props => {
    //test data
    const isActive = sessionStorage.length > 0 ? true : false;
    const isAdmin =
        isActive && sessionStorage.getItem("isAdmin") === "true" && sessionStorage.length < 3 ? true : false;
    const hasDepartment =
        isActive &&
        sessionStorage.getItem("department") !== "undefined" &&
        sessionStorage.getItem("department") !== null
            ? true
            : false;
    return (
        <Fragment>
            <Header
                isActive={isActive}
                isAdmin={isAdmin}
                hasDepartment={hasDepartment}
                avatar={sessionStorage.getItem("avatar")}
                name={sessionStorage.getItem("firstName")}
                surName={sessionStorage.getItem("lastName")}
                location={props}
            />
            <div className="notfound_container">
                <div className="login_container">
                    <h1>404</h1>
                    <h2>Page not found</h2>
                    <div className="btn_container">
                        <Button
                            text={"Home"}
                            onClick={() => {
                                window.location.replace("/");
                            }}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default NotFound;
