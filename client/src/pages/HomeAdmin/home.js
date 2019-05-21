import React from "react";
import { Tab, TabContainer } from "../../ui/core/home";
import Topics from "./Topics";
import Users from "./Users";
import Teams from "./Teams";

class HomeDashboard extends React.Component {
  state = {
    activeTab: "Topics",
  };

  openTab = tabName => {
    this.setState({ activeTab: tabName });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div>
        <TabContainer>
          <Tab
            onClick={() => this.openTab("Topics")}
            active={activeTab === "Topics"}
          >
            Topics
          </Tab>
          <Tab
            onClick={() => this.openTab("Users")}
            active={activeTab === "Users"}
          >
            Users
          </Tab>
          <Tab
            onClick={() => this.openTab("Teams")}
            active={activeTab === "Teams"}
          >
            Teams
          </Tab>
        </TabContainer>
        {activeTab === "Topics" && <Topics />}
        {activeTab === "Users" && <Users />}
        {activeTab === "Teams" && <Teams />}
      </div>
    );
  }
}

export default HomeDashboard;
