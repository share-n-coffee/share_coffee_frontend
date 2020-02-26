import React, { Component, Fragment } from "react";
import PageTitle from "../../modules/PageTitle";
// eslint-disable-next-line no-unused-vars
import TelegramLoginButton from "../../helpers/TelegramLoginButton";
import SectionInfo from "../../modules/SectionInfo";
import { setCookie } from "tiny-cookie";
import Header from "../../components/Header";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { setStorage, router } from "../../helpers/helpers";
import Preloader from "../../modules/Preloader";
import { Button } from "../../components/Button";
//import { SET_USER_DATA } from "../../constants";
//import ErrorMessage from "../../components/ErrorMessage";
//import BanMsg from "../../components/BanMsg";

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingData: false
        };
    }

    render() {
        // const isBanned = sessionStorage.getItem("banned") === "true" ? true : false;
        // eslint-disable-next-line no-unused-vars
        const handleTelegramResponse = async telegramResponse => {
            this.setState({
                loadingData: true
            });
            const requestObj = {
                method: "post",
                url: "https://forgeserver.herokuapp.com/login/",
                data: telegramResponse,
                mode: "cors",
                "Content-Type": "application/json"
            };
            const token = await axios(requestObj)
                .then(response => {
                    return response.data.token;
                })
                .catch(err => {
                    return err;
                });
            const userData = jwtDecode(`${token}`);
            const date = new Date(userData.exp * 1000).toGMTString();
            setCookie("token", token, { expires: date });
            await setStorage(userData);
            //from helpers.js
            router(this.props);
        };

        // const { error } = this.state;
        if (this.state.loadingData) {
            return (
                <div className="preloader-body">
                    <Preloader />
                </div>
            );
        }

        return (
            <Fragment>
                <Header isActive={false} isAdmin={"0"} hasDepartment={false} />
                <PageTitle title="Get your own kick off" desc="with Wargaming S&C" />
                <SectionInfo infoText="Use Telegram to be aware of upcoming meets and manage subscriptions:" />
                {/*{isBanned ? <BanMsg /> : <></>}*/}
                {/*{error ? <ErrorMessage error={error} /> : <></>}*/}
                <div id="telegram__login__container" className="section" onClick={this.update}>
                    {/* <TelegramLoginButton
            dataOnauth={handleTelegramResponse}
            botName="rdmcoffee_bot"
            requestAccess="write"
            buttonSize="large"
            cornerRadius={20}
            usePic={false}
          /> */}
                    <Button value={"Log in"} />
                </div>
            </Fragment>
        );
    }
}
