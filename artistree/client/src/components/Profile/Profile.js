import React, { Component } from 'react';
import axios from 'axios';
import AddArtwork from '../AddArtwork';
import ArtworkList from '../ArtworkList';
import { Link } from "react-router-dom";

export default class Profile extends Component {
  state = {
    imageUrl: null,
    username: null,
    location: null,
    role: null,
    artworks: [],
    error: false,
    uploadOn: false
  };


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

  }

  //change pfp
  handleFileChange(event) {
    const uploadData = new FormData();
    uploadData.append('imageUrl', event.target.files[0])
    this.setState({ uploadOn: true });
    //uploadData.append('username', this.state.username)
    axios.post("/upload", uploadData)
      .then(response => this.setState({ imageUrl: response.data.secure_url, uploadOn: false }))
      .catch(error => console.log(error))
  }


  getData = () => {
    const id = this.props.match.params.id;
    axios
      .get(`/user/${id}`)
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
        if (error.response.status === 404) {
          this.setState({ error: 'Not found' })
        }
      })
  }


  toggleEditForm = () => {
    this.setState({
      editForm: !this.state.editForm
    });
  }


  componentDidMount = () => {
    this.getData();
  }

  render() {
    console.log("hello")
    if (this.state.error) return <div>{this.state.error.toString()}</div>
    if (!this.state.username) return (<></>)
    let allowedToEdit = false;
    const user = this.props.user;
    //const owner = this.state.profile.owner;
    //toggle edit picture if owner of profile
    //if (user && user._id === owner) allowedToEdit = true;
    return (
      <div>
        <h1>{this.state.username}'s Profile</h1>
        <div>
              <img style={{height:'400px'}}
                src={this.state.imageUrl}
                alt={this.state.username}
              />
              <div>
            <h2>New Image</h2>
            <form>
                <input 
                    type="file" 
                    onChange={(e) => this.handleFileChange(e)} /> 
                
            </form>
          </div>
                
            </div>
        <p>{this.state.location}</p>
        <p>{this.state.role}</p>
        <div>
        <p>{this.state.getData}</p>
        <p>{this.state.artworks}</p>
            <Link to={AddArtwork}>
            <button onClick={this.toggleEditForm}>Add Artwork</button>
            </Link>
        </div>
      </div>
    )
  }
}

