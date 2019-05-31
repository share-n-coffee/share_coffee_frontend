import React, { Component } from "react";
import { request } from "../../../helpers/requests";
import ErrorMessage from "../../../components/ErrorMessage";
import Button from "../../../common/Button";
import * as URL from "../../../constants";
import SpinButton from "../../../common/SpinButton";
import { Loading } from "../../../ui/components/Loader";

class DeleteBtn extends Component {
  state = {
    users: [],
    deleteContent: false,
    isLoading: "",
  };

  componentDidMount() {
    this.getOneTeam(this.props.id);
  }

  getOneTeam(id) {
    request.get(URL.USER_IN_TEAM(id)).then(data => {
      this.setState({
        users: data.object.data,
        error: data.message,
      });
    });
  }

  toggle = () => {
    this.setState({ deleteContent: true });
  };

  clear = () => {
    this.setState({ deleteContent: false });
  };

  delete = id => {
    this.setState({ isLoading: true });
    request.delete(URL.ONE_TEAM(id)).then(data => {
      this.clear();
      this.setState({ isLoading: false });
      this.props.refreshData(id);
    });
  };

  render() {
    const { users, deleteContent, isLoading } = this.state;
    return users.length > 0 ? (
      ""
    ) : (
      <div className="toggle_delete">
        {!deleteContent ? (
          <img src={require("../../../assets/img/close.svg")} alt="" onClick={this.toggle} />
        ) : (
          <div>
            Are you sure you want to delete?
            <Button onClick={this.clear} text="Cancel" type="Unsubscribe" />
            <SpinButton
              onClick={() => this.delete(this.props.id)}
              text="Delete"
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    );
  }
}

class Teams extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    teams: [],
    isShowAdding: false,
    team: "",
    error: "",
    isLoading: false,
    isLoadData: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ isLoadData: true });
    request.get(URL.TEAMS).then(data => {
      this.setState({
        teams: data.object.data,
        error: data.message,
        isLoadData: false,
      });
    });
  }

  changeInput = value => {
    this.setState({ team: value });
  };

  toggleAdding = () => {
    this.setState({
      isShowAdding: !this.state.isShowAdding,
      error: "",
    });
  };

  refreshData = id => {
    this.setState({
      teams: this.state.teams.filter(team => team._id !== id),
    });
  };

  adding = () => {
    this.setState({ isLoading: true });

    if (this.state.team === "") {
      this.setState({ error: "Name must be filled out" });
    } else {
      this.setState({ error: "" });

      const department = {
        title: this.state.team,
        description: "",
      };

      request.post(URL.TEAMS, department).then(data => {
        if (!data.message) {
          this.toggleAdding();
          this.setState({
            teams: this.state.teams.concat(data.object.data),
            isLoading: false,
          });
        } else {
          this.setState({
            error: data.message,
            isLoading: false,
          });
        }
      });
    }
  };

  render() {
    const { teams, isShowAdding, error, isLoading, isLoadData } = this.state;
    return isLoadData ? (
      <Loading />
    ) : (
      <div style={{ textAlign: "left" }}>
        {teams && teams.length > 0 ? (
          teams.map(team => (
            <div key={team._id} className={"team_block"}>
              <span>{team.title}</span>
              <DeleteBtn id={team._id} refreshData={id => this.refreshData(id)} />
            </div>
          ))
        ) : (
          <div>Team is empty</div>
        )}
        {!isShowAdding ? (
          <div className="add_btn">
            <Button onClick={this.toggleAdding} text="Add team" />
          </div>
        ) : (
          <div className="add_team_container">
            <input
              autoFocus={true}
              className="form__field-input"
              type="text"
              onChange={e => this.changeInput(e.target.value)}
              placeholder="Department name"
            />
            <div className="two_btn_group">
              <Button onClick={this.toggleAdding} type="Unsubscribe" text="Cancel" />
              <SpinButton onClick={this.adding} text="Save" isLoading={isLoading} />
            </div>
          </div>
        )}
        {error ? <ErrorMessage error={error} /> : ""}
      </div>
    );
  }
}

export default Teams;
