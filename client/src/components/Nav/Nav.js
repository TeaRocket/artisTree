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
    <nav role="navigation" aria-labelledby="sections-heading">
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

        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul>
            <li className="link">
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li className="link">
                  <Link to={`/user/${user._id}`}>Profile</Link>
                </li>
                <li className="link">
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : (
              <>
                {!onArtistSignupPage && (
                  <li className="link">
                    <Link to="/signup?artist=true">Create artist profile</Link>
                  </li>
                )}
                {!onLoginPage && (
                  <li className="link">
                    <Link to="/login">Login</Link>
                  </li>
                )}
                {!onSignupPage && (
                  <li className="link">
                    <Link
                      to="/signup"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Signup
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
