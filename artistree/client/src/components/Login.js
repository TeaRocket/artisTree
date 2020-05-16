import React, { Component } from "react";
import { login } from "../services/auth";
import Nav from "./Nav/Nav";
import { UserContext } from "../contexts/UserContext";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    message: "",
  };
  static contextType = UserContext;

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    login(username, password).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: "",
        });
      } else {
        const { setUser } = this.context;
        setUser(data);
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            id="username"
          />
          <label>Password: </label>
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            id="password"
          />
          {this.state.message && (
            <div variant="danger">{this.state.message}</div>
          )}
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
