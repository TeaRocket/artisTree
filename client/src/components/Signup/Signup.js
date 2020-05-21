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
      <main class="main-box">
        <div class="form-popup" id="myForm">
          <form class="form-signup" onSubmit={this.handleSubmit}>
            <div class="con">
              <header class="head-form">
                <h2>Signup</h2>
                <p>Sign up here to use our services.</p>
              </header>
              <br></br>
              <div class="field-set">
                <label>Username: </label>
                <input
                  type="text"
                  name="username"
                  placeholder="picasso"
                  value={this.state.username}
                  onChange={this.handleChange}
                  //id="username"
                  id="txt-input"
                  class="form-input"
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
                  class="form-input"
                />
                <br></br>
                <label>Email: </label>
                <input
                  type="text"
                  name="email"
                  placeholder="picasso@mail.com"
                  value={this.state.email}
                  onChange={this.handleChange}
                  // id="email"
                  id="txt-input"
                  class="form-input"
                />
                <br></br>
                <label>Birthday: </label>
                <input
                  type="date"
                  name="birthDate"
                  value={this.state.birthDate}
                  onChange={this.handleChange}
                  // id="birthDate"
                  id="txt-input"
                  class="form-input"
                />
                {this.isArtist() && (
                  <>
                    <br></br>
                    <label>Location: </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="City"
                      value={this.state.location}
                      onChange={this.handleChange}
                      // id="location"
                      id="txt-input"
                      class="form-input"
                    />
                    <br></br>
                    <label>Type of artist: </label>
                    <select
                      name="category"
                      id="category"
                      value={this.state.category}
                      onChange={this.handleChange}
                      class="form-input"
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
                <button type="submit" value="Signup" class="signup">
                  Signup
                </button>
                <br></br>
                <button type="submit" class="btn cancel" onclick="closeForm()">
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
