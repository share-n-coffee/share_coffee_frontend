import React from "react";
import { Tab, TabContainer } from "../../ui/core/home";
import Topics from "./Topics";
import Users from "./Users";
import Teams from "./Teams";
import Header from "../../common/Header";
import { checkerProp } from "../../helpers/helpers";
import PageTitle from "../../modules/PageTitle";

class HomeDashboard extends React.Component {
  state = {
    activeTab: "Topics",
  };

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.page)
      this.setState({ activeTab: this.props.location.state.page });
  }

  openTab = tabName => {
    this.setState({ activeTab: tabName });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <>
        <Header
          isActive={true}
          isAdmin={
            checkerProp(sessionStorage.getItem("isAdmin")) ? "2" : sessionStorage.getItem("isAdmin")
          }
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
      </>
    );
  }
}

export default HomeDashboard;
