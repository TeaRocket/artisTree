import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./contexts/UserContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage/HomePage";
import SearchResults from "./components/SearchResults/SearchResults";
import Logout from "./components/Logout/Logout";
import Profile from "./components/Profile/Profile";
import Logout from "./components/Logout/Logout";

class App extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    axios
      .get("/auth/loggedin")
      .then((response) => {
        const { setUser } = this.context;
        setUser(response.data);
      })
      .catch((err) => null);
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/results" component={SearchResults} />
<<<<<<< HEAD
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/user/:id" component={Profile} />
=======
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/logout" component={Logout} />
>>>>>>> cal pow
      </div>
    );
  }
}

export default App;
