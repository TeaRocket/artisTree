import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

export default function Nav() {
  const { user } = useContext(UserContext);
  const { pathname, search } = useLocation();
  const [checkBoxRef] = useState(React.createRef());
  const onLoginPage = pathname === "/login";
  const onSignupPage = pathname === "/signup" && search !== "?artist=true";
  const onArtistSignupPage = search === "?artist=true";

  const closeMenu = () => {
    checkBoxRef.current.checked = !checkBoxRef.current.checked;
  };
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
          <input aria-label="menu" type="checkbox" ref={checkBoxRef} />
          <span></span>
          <span></span>
          <span></span>
          <ul>
            <li className="link">
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li className="link">
                  <Link to={`/user/${user._id}`} onClick={closeMenu}>
                    Profile
                  </Link>
                </li>
                <li className="link">
                  <Link to="/logout" onClick={closeMenu}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                {!onArtistSignupPage && (
                  <li className="link">
                    <Link to="/signup?artist=true" onClick={closeMenu}>
                      Create artist profile
                    </Link>
                  </li>
                )}
                {!onLoginPage && (
                  <li className="link">
                    <Link to="/login" onClick={closeMenu}>
                      Login
                    </Link>
                  </li>
                )}
                {!onSignupPage && (
                  <li className="link">
                    <Link
                      to="/signup"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={closeMenu}
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
