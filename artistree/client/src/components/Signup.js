import React, { Component } from 'react';
import { signup } from '../services/auth';

export default class Signup extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    birthDate: '',
    location: '',
    role: '',
    message: ''
  };
  handleChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const {username, password, email, birthDate, location, role} = this.state;

    signup(username, password, email, birthDate, location, role).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: '',
          password: '',
          email: '',
          birthDate: '',
          location: '',
          role: ''
        });
      } else {
        this.props.setUser(data);
        this.props.history.push('/login');
      }
    });
  };
  render() {
    return (
      <div>
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
            <label>Username: </label>
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              id='username'
            />
            <label>Password: </label>
            <input
              type='text'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              id='password'
            />
            <label>Email: </label>
            <input
              type='text'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              id='email'
            />
            <label>Birthdate: </label>
            <input
              type='date'
              name='birthDate'
              value={this.state.birthDate}
              onChange={this.handleChange}
              id='birthDate'
            />
            <label>Location: </label>
            <input
              type='text'
              name='location'
              value={this.state.location}
              onChange={this.handleChange}
              id='location'
            />
            <label>Role: </label>
            <input
              type='text'
              name='role'
              value={this.state.role}
              onChange={this.handleChange}
              id='role'
            />
          {this.state.message && (
            <Alert variant='danger'>{this.state.message}</Alert>
          )}
          <input type='submit' value="Signup"/>
          </form>
      </div>
    );
  }
}

export default Signup;