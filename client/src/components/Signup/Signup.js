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
        <h2>Signup</h2>
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
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            id="password"
          />
          <label>Email: </label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            id="email"
          />
          <label>Birthdate: </label>
          <input
            type="date"
            name="birthDate"
            value={this.state.birthDate}
            onChange={this.handleChange}
            id="birthDate"
          />
          {this.isArtist() && (
            <>
              <label>Location: </label>
              <input
                type="text"
                name="location"
                value={this.state.location}
                onChange={this.handleChange}
                id="location"
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
          <input type="submit" value="Signup" />
        </form>
      </div>
    );
  }
}
