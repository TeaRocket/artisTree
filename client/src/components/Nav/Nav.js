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
  //const onArtistSignup = pathname === "/signup";
  return (
    <div id="Nav">
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
        <div id="nav-right-container">
          <div id="nav-inner-r">
            <Link to="/" id="link">
              <a>Home</a>
            </Link>
            {user ? (
              <>
                <Link to={`/user/${user._id}`} id="link">
                  <a>Profile</a>
                </Link>
                <Link to="/logout" id="link">
                  <a>Logout</a>
                </Link>
              </>
            ) : (
              <>
                {!onArtistSignupPage && (
                  <Link to="/signup?artist=true" id="link">
                    <a>Create artist profile</a>
                  </Link>
                )}
                {!onLoginPage && (
                  <Link to="/login" id="link">
                    <a>Login</a>
                  </Link>
                )}
                {!onSignupPage && (
                  <Link to="/signup" id="link">
                    <a
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Signup
                    </a>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
