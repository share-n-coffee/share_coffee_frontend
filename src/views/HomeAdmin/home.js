import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Tab, TabContainer } from "../../ui/core/home";
import Topics from "./Topics";
import Users from "./Users";
import Teams from "./Teams";
import Header from "../../components/Header";
import { checkerProp } from "../../helpers/helpers";
import PageTitle from "../../modules/PageTitle";

class HomeDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: "Topics"
        };
    }

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.page) {
            this.setState({ activeTab: this.props.location.state.page });
        }
    }

    openTab = tabName => {
        this.setState({ activeTab: tabName });
    };

    render() {
        const { activeTab } = this.state;

        return (
            <Fragment>
                <Header
                    isActive
                    isAdmin={checkerProp(sessionStorage.getItem("isAdmin")) ? "2" : sessionStorage.getItem("isAdmin")}
                    hasDepartment={false}
                    location={this.props}
                    avatar={sessionStorage.getItem("avatar")}
                    name={sessionStorage.getItem("firstName")}
                    surName={sessionStorage.getItem("lastName")}
                />
                <main>
                    <PageTitle title="Admin panel" withShadowContainer={false} />
                    <div className="login_container" style={{ width: "100%" }}>
                        <div>
                            <TabContainer>
                                <Tab onClick={() => this.openTab("Topics")} active={activeTab === "Topics"}>
                                    Topics
                                </Tab>
                                <Tab onClick={() => this.openTab("Users")} active={activeTab === "Users"}>
                                    Users
                                </Tab>
                                <Tab onClick={() => this.openTab("Teams")} active={activeTab === "Teams"}>
                                    Teams
                                </Tab>
                            </TabContainer>
                            <div className="shadow_container" />
                            {activeTab === "Topics" && <Topics history={this.props.history} />}
                            {activeTab === "Users" && <Users />}
                            {activeTab === "Teams" && <Teams />}
                        </div>
                    </div>
                </main>
            </Fragment>
        );
    }
}

HomeDashboard.propTypes = {
    history: PropTypes.object,
    location: PropTypes.shape({
        state: PropTypes.shape({
            page: PropTypes.number
        })
    })
};

export default HomeDashboard;
