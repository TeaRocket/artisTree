import React, { Component } from "react";
import { login } from "../../services/auth";
import { UserContext } from "../../contexts/UserContext";

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
        const user = data;
        const { setUser } = this.context;
        setUser(user);
        this.props.history.push(
          user.role === "Artist" ? `/user/${user._id}` : "/#search"
        );
      }
    });
  };

  render() {
    return (
      <main className="main-box">
        <div className="form-popup" id="myForm">
          <form className="form-login" onSubmit={this.handleSubmit}>
            <div className="con">
              <header className="head-form">
                <h2>Login</h2>
                <p>Already signed up? Login here.</p>
              </header>
              <br></br>
              <div className="field-set">
                <label>Username: </label>
                <input
                  type="text"
                  name="username"
                  placeholder="picasso"
                  value={this.state.username}
                  onChange={this.handleChange}
                  //id="username"
                  id="txt-input"
                  className="form-input"
                />
                <br></br>
                <label>Password: </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  // id="password"
                  id="txt-input"
                  className="form-input"
                />

                {this.state.message && (
                  <div variant="danger">{this.state.message}</div>
                )}
                <br></br>
                <button type="submit" value="Login" className="Login">
                  Login
                </button>
                <br></br>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
