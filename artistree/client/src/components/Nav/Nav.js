import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default class Nav extends Component {
  static contextType = UserContext;

  render() {
    const { user } = this.context;

    return (
      <div id="Nav">
        <div id="nav-inner-l">
          <Link to="/">
            <img
              src={window.location.origin + "/artistree.png"}
              id="logo"
              alt="logo"
            />
          </Link>
        </div>
        <div id="nav-inner-r">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/logout">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    );
  }
}
