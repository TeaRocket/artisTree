import React, { createContext, Component } from "react";

export const UserContext = createContext();

class UserContextProvider extends Component {
  state = {
    user: "",
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <UserContext.Provider value={{ ...this.state, setUser: this.setUser }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
