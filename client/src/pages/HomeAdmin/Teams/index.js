import React, { Component } from "react";
import { request } from "../../../helpers/requests";
import ErrorMessage from "../../../components/ErrorMessage";
import Button from "../../../common/Button";
import * as URL from "../../../constants";

class DeleteBtn extends Component {
  state = {
    team: [],
    deleteContent: false,
  };

  componentDidMount() {
    this.getOneTeam(this.props.id);
  }

  getOneTeam(id) {
    request.get(URL.GET_ONE_TEAM(id)).then(data => {
      this.setState({
        team: data.object,
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

  delete = () => {
    console.log("delete");
    this.clear();
  };

  render() {
    const { deleteContent } = this.state;
    return (
      <div className="toggle_delete">
        {!deleteContent ? (
          <img src={require("../../../assets/img/close.svg")} alt="" onClick={this.toggle} />
        ) : (
          <div>
            Are you sure you want to delete?
            <Button onClick={this.clear} text="Cancel" type="Unsubscribe" />
            <Button onClick={this.delete} text="Delete" />
          </div>
        )}
      </div>
    );
  }
}

class Teams extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    teams: [],
    isShowAdding: false,
    team: "",
    error: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    request.get(URL.TEAMS).then(data => {
      this.setState({
        teams: data.object,
        error: data.message,
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

  adding = () => {
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
          this.getData();
        } else {
          this.setState({ error: data.message });
        }
      });
    }
  };

  render() {
    const { teams, isShowAdding, error } = this.state;
    return (
      <div style={{ textAlign: "left" }}>
        {teams &&
          teams.length > 0 &&
          teams.map(team => (
            <div key={team._id} className={"team_block"}>
              <span>{team.title}</span>
              <DeleteBtn id={team._id} />
            </div>
          ))}
        {!isShowAdding ? (
          <Button onClick={this.toggleAdding} text=" Add team" />
        ) : (
          <div>
            <input
              autoFocus={true}
              className="form__field-input"
              type="text"
              onChange={e => this.changeInput(e.target.value)}
              placeholder="Department name"
            />
            <Button onClick={this.adding} text="Save" />
            <Button onClick={this.toggleAdding} type="Unsubscribe" text="Cancel" />
          </div>
        )}
        {error ? <ErrorMessage error={error} /> : ""}
      </div>
    );
  }
}

export default Teams;
