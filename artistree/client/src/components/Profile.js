import React, {Component} from 'react';
import axios from 'axios';

export default class Profile extends Component {
  state = {
    imageUrl: null,
    username: null,
    location: null,
    role: null,
    artworks: []
  };

  componentDidMount = () => {
    this.getData();
  }
  
  componentDidUpdate = () => {
    this.getData();
  }
  
  getData = () => {
    const id = this.props.match.params.id;
    console.log(id);
    axios
    .get(`/profile/${id}`)
    .then(response => {
      console.log(response);
      this.setState({
        imageUrl: response.data.imageUrl,
        username: response.data.username,
        location: response.data.location,
        role: response.data.role,
        artworks: response.data.artworks,
        })
    })
    .catch(error => {
      if (err.response.status === 404) {
        this.setState({ error: 'Not found' })
      }  
    })
  }
  
  render() {
    return (
      <div>
       <h1>{this.state.username}</h1>
       <img src={this.state.imageUrl} alt="img"/>
       <p>{this.state.location}</p>
      </div>
    )
  }
}

