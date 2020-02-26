import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import HomeDashboard from "./home";
import Preloader from "../../modules/Preloader";
import { GET_USER } from "../../constants/";
import AdminLoginPage from "../AdminLoginPage";
import { request } from "../../helpers/requests";

class HomeAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: 0,
            loading: true
        };
    }

    componentDidMount() {
        this.setLogin();
    }

    setLogin() {
        const id = sessionStorage.getItem("id");
        if (id) {
            request.get(GET_USER(id)).then(data => {
                this.setState({
                    isLogin: data.object.data.admin.permission,
                    loading: false
                });
            });
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="preloader-body">
                    <Preloader />
                </div>
            );
        }

        return (
            <Fragment>
                {/*<Header*/}
                {/*isActive={true}*/}
                {/*isAdmin={sessionStorage.getItem("isAdmin")}*/}
                {/*hasDepartment={false}*/}
                {/*location={this.props}*/}
                {/*avatar={sessionStorage.getItem("avatar")}*/}
                {/*name={`${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}`}*/}
                {/*/>*/}
                {/*<div className="login_container" style={{ width: "100%" }}>*/}
                {/*<h1>Admin panel</h1>*/}
                {this.state.isLogin ? (
                    <HomeDashboard history={this.props.history} location={this.props.location} />
                ) : (
                    <AdminLoginPage setLogin={() => this.setLogin()} />
                )}
                {/*</div>*/}
            </Fragment>
        );
    }
}

HomeAdmin.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
};

export default HomeAdmin;
