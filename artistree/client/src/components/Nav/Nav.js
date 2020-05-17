import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

export default function Nav() {
  const { user } = useContext(UserContext);
  const { pathname, search } = useLocation();

  const onLoginPage = pathname === "/login";
  const onSignupPage = pathname === "/signup" && search !== "?artist=true";
  const onArtistSignupPage = search === "?artist=true";
  //const onArtistSignup = pathname === "/signup";
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
            {!onArtistSignupPage && (
              <Link to="/signup?artist=true">Create artist profile</Link>
            )}
            {!onLoginPage && <Link to="/login">Login</Link>}
            {!onSignupPage && <Link to="/signup">Signup</Link>}
          </>
        )}
      </div>
    </div>
  );
}
