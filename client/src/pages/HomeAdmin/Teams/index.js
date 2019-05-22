import React, { Component } from "react";
import requests from "../../../helpers/requests";
import ErrorMessage from "../../../components/ErrorMessage";
import { Button, ButtonText } from "../../../ui/components/button";

class DeleteBtn extends Component {
  state = {
    team: [],
    deleteContent: false,
  };

  componentDidMount() {
    this.getOneTeam(this.props.id);
  }

  getOneTeam(id) {
    const requestUrl = `https://forge-development.herokuapp.com/api/departments/${id}`;

    requests.get(requestUrl).then(data => {
      console.log(data);
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
    const { team, deleteContent } = this.state;
    return (
      <div className="toggle_delete">
        {!deleteContent ? (
          <img
            src={require("../../../assets/img/close.svg")}
            alt=""
            onClick={this.toggle}
          />
        ) : (
          <div>
            Are you sure you want to delete?
            <ButtonText onClick={this.clear} style={{ marginLeft: "10px" }}>
              Cancel
            </ButtonText>
            <Button onClick={this.delete} style={{ marginLeft: "10px" }}>
              Delete
            </Button>
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
    const requestUrl =
      "https://forge-development.herokuapp.com/api/departments/";

    requests.get(requestUrl).then(data => {
      console.log(data);
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

      const requestUrl =
        "https://forge-development.herokuapp.com/api/departments/";
      const token = localStorage.getItem("adminToken");
      const department = {
        title: this.state.team,
        description: "",
      };
      fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify(department),
      })
        .then(data => {
          return data.json();
        })
        .then(data => {
          console.log(data);
          if (data.errors && data.errors.length > 0) {
            this.setState({ error: data.errors[0].msg });
          } else {
            this.toggleAdding();
            this.setState({ success: true });
            this.getData();
          }
        })
        .catch(err => {
          this.setState({ error: err.message });
          console.error(err);
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
          <Button onClick={this.toggleAdding} style={{ marginTop: "10px" }}>
            Add team
          </Button>
        ) : (
          <div>
            <input
              autoFocus={true}
              className="form__field-input"
              type="text"
              onChange={e => this.changeInput(e.target.value)}
              placeholder="Department name"
            />
            <Button onClick={this.adding} style={{ marginRight: "10px" }}>
              Save
            </Button>
            <ButtonText onClick={this.toggleAdding}>Cancel</ButtonText>
          </div>
        )}
        {error ? <ErrorMessage error={error} /> : ""}
      </div>
    );
  }
}

export default Teams;
