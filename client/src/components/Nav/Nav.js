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
    <nav>
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
                  <Link to="/signup?artist=true">Create artist profile</Link>
                )}
                {!onLoginPage && <Link to="/login">Login</Link>}
                {!onSignupPage && (
                  <div className="link">
                    <Link
                      to="/signup"
                      class="btn btn-primary"
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
