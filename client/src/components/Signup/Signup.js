import React, { Component } from "react";
import { signup } from "../../services/auth";
import Nav from "../Nav/Nav";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
const queryString = require("query-string");

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    birthDate: "",
    location: "",
    message: "",
    categories: [],
    category: "",
  };
  static contextType = UserContext;

  componentDidMount = () => {
    axios.get("/categories").then((categories) => {
      this.setState({
        categories: categories.data,
      });
    });
  };

  isArtist = () => {
    const parsed = queryString.parse(this.props.location.search);
    return Boolean(parsed.artist);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      username,
      password,
      email,
      birthDate,
      location,
      category,
    } = this.state;

    signup(
      username,
      password,
      email,
      birthDate,
      location,
      this.isArtist() ? "Artist" : "Client",
      category
    ).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: "",
          email: "",
          birthDate: "",
          location: "",
          role: "",
        });
      } else {
        const { setUser } = this.context;
        setUser(data);
        this.props.history.push("/login");
      }
    });
  };
  render() {
    //getting a query from url

    return (
      <div>
        <Nav />
        <div>
          <form onSubmit={this.handleSubmit}>
            <div class="con">
              <header class="head-form">
                <h2>Signup</h2>
                <p>Sign up here to use our services.</p>
              </header>
              <br></br>
              <div class="field-set">
                <span class="input-item">
                  <i class="fa fa-user-circle"></i>
                </span>
                <input
                  type="text"
                  name="username"
                  placeholder="UserName"
                  value={this.state.username}
                  onChange={this.handleChange}
                  //id="username"
                  id="txt-input"
                  class="form-input"
                />
                <br></br>
                <span class="input-item">
                  <i class="fa fa-key"></i>
                </span>
                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  // id="password"
                  id="pwd"
                  class="form-input"
                />
                <br></br>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  // id="email"
                  id="txt-input"
                  class="form-input"
                />
                <br></br>
                <input
                  type="date"
                  name="birthDate"
                  placeholder="Birthdate"
                  value={this.state.birthDate}
                  onChange={this.handleChange}
                  // id="birthDate"
                  id="txt-input"
                  class="form-input"
                />
                {this.isArtist() && (
                  <>
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={this.state.location}
                      onChange={this.handleChange}
                      // id="location"
                      id="txt-input"
                      class="form-input"
                    />
                    <label>Type of artist: </label>
                    <select
                      name="category"
                      id="category"
                      value={this.state.category}
                      onChange={this.handleChange}
                    >
                      {this.state.categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {this.state.message && (
                  <div variant="danger">{this.state.message}</div>
                )}
                <br></br>
                <button type="submit" value="Signup" class="log-in">
                  Signup
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
