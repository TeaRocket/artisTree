import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage/HomePage";
import SearchResults from "./components/SearchResults/SearchResults";
import { UserContext } from "./contexts/UserContext";

class App extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    axios
      .get("/auth/loggedin")
      .then((response) => {
        const { setUser } = this.context;
        setUser(response.data);
        console.log("updated user", response);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/results" component={SearchResults} />
      </div>
    );
  }
}

export default App;
