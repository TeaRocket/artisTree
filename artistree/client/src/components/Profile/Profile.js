import React, { Component } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import DateAdder from "../DateAdder/DateAdder";
import { UserContext } from "../../contexts/UserContext";
import Availabilities from "../Availabilities/Availabilities";

import AddArtwork from "../AddArtwork";
import ArtworkList from "../ArtworkList";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  static contextType = UserContext;

  state = {
    imageUrl: null,
    username: null,
    location: null,
    role: null,
    artworks: [],
    error: false,
    uploadOn: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  //change pfp
  handleFileChange(event) {
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);
    this.setState({ uploadOn: true });
    //uploadData.append('username', this.state.username)
    axios
      .post("/upload", uploadData)
      .then((response) =>
        this.setState({ imageUrl: response.data.secure_url, uploadOn: false })
      )
      .catch((error) => console.log(error));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`/profile/${id}`, {
        imageUrl: this.state.imageUrl,
        username: this.state.username,
        location: this.state.location,
      })
      .then((response) => {
        this.setState({
          imageUrl: response.data.imageUrl,
          username: response.data.username,
          location: response.data.location,
          editForm: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getData = () => {
    const id = this.props.match.params.id;
    axios
      .get(`/user/${id}`)
      .then((response) => {
        // console.log(response);
        this.setState({
          imageUrl: response.data.imageUrl,
          username: response.data.username,
          location: response.data.location,
          role: response.data.role,
          artworks: response.data.artworks,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  toggleEditForm = () => {
    this.setState({
      editForm: !this.state.editForm,
    });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    if (this.state.error) return <div>{this.state.error.toString()}</div>;
    if (!this.state.username) return <></>;
    // let allowedToEdit = false;
    // const user = this.props.user;
    //const owner = this.state.profile.owner;
    //toggle edit picture if owner of profile
    //if (user && user._id === owner) allowedToEdit = true;
    return (
      <div>
        <h1>{this.state.username}'s Profile</h1>
        <div>
          <img
            style={{ height: "400px" }}
            src={this.state.imageUrl}
            alt={this.state.username}
          />
          <form>
            <input
              type="file"
              name="photo"
              onChange={(e) => this.handleFileChange(e)}
            />
            <input type="submit" value="Upload Photo" />
          </form>
        </div>
        <div>
          <p>{this.state.getData}</p>
          <p>{this.state.artworks}</p>
          <Link to={AddArtwork}>
            <button onClick={this.toggleEditForm}>Add Artwork</button>
          </Link>
        </div>
        <Availabilities />
        <DateAdder />
      </div>
    );
  }
}
