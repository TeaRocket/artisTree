import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

export default function Nav() {
  const { user } = useContext(UserContext);
  const { pathname, search } = useLocation();

  const onLoginPage = pathname === "/login";
  const onSignupPage = pathname === "/signup" && search !== "?artist=true";
  const onArtistSignupPage = search === "?artist=true";
  return (
    <nav aria-labelledby="sections-heading">
      <div id="nav-left-container">
        <div id="nav-inner-l">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/artistree/image/upload/v1589980960/Images/ARTISTREELOGO_afkwqa.png"
              id="logo"
              alt="logo"
            />
          </Link>
        </div>
        <button
          className="hamburger hamburger--collapse is-active"
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        <div id="nav-right-container">
          <div id="nav-inner-r">
            <div className="link">
              <Link to="/">Home</Link>
            </div>
            {user ? (
              <>
                <div className="link">
                  <Link to={`/user/${user._id}`}>Profile</Link>
                </div>
                <div className="link">
                  <Link to="/logout">Logout</Link>
                </div>
              </>
            ) : (
              <>
                {!onArtistSignupPage && (
                  <div className="link">
                    <Link to="/signup?artist=true">Create artist profile</Link>
                  </div>
                )}
                {!onLoginPage && (
                  <div className="link">
                    <Link to="/login">Login</Link>
                  </div>
                )}
                {!onSignupPage && (
                  <div className="link">
                    <Link
                      to="/signup"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Signup
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
