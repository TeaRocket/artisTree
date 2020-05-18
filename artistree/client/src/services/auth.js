import axios from 'axios';

const signup = (username, password, email, birthDate, location, role) => {
  return axios
  .post('auth/signup', {username, password, email, birthDate, location, role})
  .then(response => {
    console.log("response", response)
    return response.data;
  })
  .catch(error => {
    console.log("error", error)
    return error.response.data;
  });
}

const login = (username, password) => {
  return axios
  .post('auth/login', {username, password})
  .then(response => {
    return response.data;
  })
  .catch(error => {
    return error.response.data;
  });
}

const logout = () => {
  return axios
  .delete('auth/logout')
  .then(response => {
    return response.data;
  })
  .catch(error => {
    return error.response.data;
  });
}

export {signup, login, logout};
