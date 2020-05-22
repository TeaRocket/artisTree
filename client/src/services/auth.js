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
    .post("/api/auth/signup", {
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
    .post("/api/auth/login", { username, password })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const logout = () => {
  return axios
    .delete("/api/auth/logout")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export { signup, login, logout };
