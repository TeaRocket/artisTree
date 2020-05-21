import React, { createContext, Component } from "react";
import axios from "axios";

export const UserContext = createContext();

class UserContextProvider extends Component {
  state = {
    user: {
      availability: [],
    },
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  updateUser = (user) => {
    axios
      .put(this.state.user._id + "/profile", { ...this.state.user, ...user })
      .then((response) => {
        // console.log("this was put to db", response);
        return this.setUser(response.data);
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          setUser: this.setUser,
          updateUser: this.updateUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
