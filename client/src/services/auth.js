import axios from "axios";

const signup = (
  username,
  password,
  email,
  birthDate,
  location,
  role,
  category
) => {
  return axios
    .post("/auth/signup", {
      username,
      password,
      email,
      birthDate,
      location,
      role,
      category,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const login = (username, password) => {
  return axios
    .post("/auth/login", { username, password })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const logout = () => {
  return axios
    .delete("/auth/logout")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export { signup, login, logout };
