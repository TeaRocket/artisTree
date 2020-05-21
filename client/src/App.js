import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./contexts/UserContext";
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

class App extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    axios
      .get("/auth/loggedin")
      .then((response) => {
        console.log(response.data);
        const { setUser } = this.context;
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Route exact path="/" component={SearchResults} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/user/:id" component={Profile} />
        <Route exact path="/messages" component={MessagesPage} />
        <Route exact path="/messages/:id" component={MessagesPage} />
        <Route exact path="/user/:id/artwork" component={AddArtwork} />
        <Route exact path="/user/:id/artwork" component={ArtworkList} />
        <Route
          exact
          path="/user/:id/artwork/:artworkId"
          component={ArtworkDetails}
        />
      </div>
    );
  }
}

export default App;
