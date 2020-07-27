import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import socketIOClient from "socket.io-client";

import { UserContext } from "./contexts/UserContext";
import { SocketContext } from "./contexts/SocketContext";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import SearchResults from "./components/SearchResults/SearchResults";
import Logout from "./components/Logout/Logout";
import Profile from "./components/Profile/Profile";
import MessagesPage from "./components/MessagesPage/MessagesPage";
import AddArtwork from "./components/AddArtwork/AddArtwork";
import ArtworkDetails from "./components/ArtworkDetails/ArtworkDetails";
import ArtworkList from "./components/ArtworkList/ArtworkList";
import Nav from "./components/Nav/Nav";

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const { socket, setSocket } = useContext(SocketContext);

  useEffect(() => {
    axios
      .get("/api/auth/loggedin")
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }, [setUser]);

  useEffect(() => {
    if (user && user._id) {
      setSocket(socketIOClient());
    }
    return () => {
      if (user && user._id && socket) {
        console.log("disconnect socket io client");
        socket.emit("leave");
      }
    };
  }, [user && user._id]);

  useEffect(() => {
    if (user && user._id && socket) {
      socket.emit("join", { userId: user._id });
    }
  }, [user && user._id, socket]);

  const RedirectToLogin = ({ history }) => {
    history.push("/login");
    return null;
  };

  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" component={SearchResults} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/user/:id" component={Profile} />
        <Route
          exact
          path="/user/:id/artwork/:artworkId"
          component={ArtworkDetails}
        />
        {user ? (
          <>
            <Route exact path="/messages" component={MessagesPage} />
            <Route exact path="/messages/:id" component={MessagesPage} />
            <Route exact path="/user/:id/artwork" component={AddArtwork} />
            <Route exact path="/user/:id/artwork" component={ArtworkList} />
          </>
        ) : (
          <>
            <Route exact path="/messages" component={RedirectToLogin} />
            <Route exact path="/messages/:id" component={RedirectToLogin} />
            <Route exact path="/user/:id/artwork" component={RedirectToLogin} />
            <Route exact path="/user/:id/artwork" component={RedirectToLogin} />
          </>
        )}
        <Route
          component={({ history }) => {
            history.push("/");
            return null;
          }}
        />
      </Switch>
    </div>
  );
};

export default App;
