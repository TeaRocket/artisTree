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
    uploadData.append('username', response.data.username)
    console.log(uploadData)
    //need to change this route
    axios.post("http://localhost:5000/auth/upload", uploadData)
    .then(response => this.setState({ imageUrl: response.data.secure_url}))
    .catch(error => console.log(error))
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

  toggleEditForm = () => {
    this.setState({
      editForm: !this.state.editForm
    });
  }
  
  render() {
    if (this.state.error) return <div>{this.state.error}</div>
    if (!this.state.username) return (<></>)
    let allowedToEdit = false;
    const user = this.props.user;
    const owner = this.state.profile.owner;
    if (user && user._id === owner) allowedToEdit = true;
    return (
      <div>
       <h1>{this.state.username}</h1>
       <img src={this.state.imageUrl} alt="img"/>
       <button onClick={this.toggleEditForm}>Edit Picture</button>
       <p>{this.state.location}</p>
      </div>
    )
  }
}

