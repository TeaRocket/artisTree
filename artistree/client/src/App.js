import React from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage/HomePage";
import SearchResults from "./components/SearchResults/SearchResults";
import UserContext from "./contexts/UserContext";

class App extends React.Component {
  state = {
    user: null,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  componentDidMount() {
    axios
      .get("/auth/loggedin")
      .then((response) => {
        const user = response.data;
        this.setState({
          user,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        <div className="App">
          <Route
            exact
            path="/signup"
            render={(props) => <Signup setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login setUser={this.setUser} {...props} />}
          />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/results" component={SearchResults} />
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
