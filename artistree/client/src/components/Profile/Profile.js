import React, { Component } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import DateAdder from "../DateAdder/DateAdder";
import { UserContext } from "../../contexts/UserContext";
import Availabilities from "../Availabilities/Availabilities";

import AddArtwork from "../AddArtwork/AddArtwork";
import ArtworkList from "../ArtworkList/ArtworkList";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  static contextType = UserContext;

  state = {
    imageUrl: null,
    username: null,
    location: null,
    role: null,
    artworks: [],
    images: [],
    error: false,
    addArtworkForm: false,
    editPicture: false,
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
    this.setState({ uploadOn: true }, () => {
      axios
        .post("/upload/single", uploadData)
        .then((response) => {
          console.log(response.data);
          this.setState({
            imageUrl: response.data.secure_url,
            uploadOn: false,
          });
        })
        .catch((error) => console.log(error));
    });
    //uploadData.append('username', this.state.username)
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
  uploadMultiple(event) {
    event.preventDefault();
    const uploadData = new FormData();
    //uploadData.append('')
    uploadData.append("images", event.target.files);
    this.setState({ uploadOn: true }, () => {
      axios
        .post("/upload/multiple", uploadData)
        .then((response) => {
          console.log(response.data);
          this.setState({ images: response.data.images, uploadOn: false });
        })
        .catch((error) => console.log(error));
    });
  }

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
      editPicture: !this.state.editPicture,
    });
  };

  toggleArtwork = () => {
    this.setState({
      addArtworkForm: !this.state.addArtworkForm,
    });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    if (this.state.error) return <div>{this.state.error.toString()}</div>;
    if (!this.state.username) return <></>;
    let allowedToEdit = false;
    const user = this.props.user;
    //const owner = this.state.artworks.owner;
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
          <div>
            <button type="button" onClick={this.toggleEditForm}>
              Edit Picture
            </button>
            {this.state.editPicture && (
              <form>
                <input type="file" onChange={(e) => this.handleFileChange(e)} />
              </form>
            )}
          </div>
        </div>
        <p>{this.state.location}</p>
        <p>{this.state.role}</p>
        <div>
          <form
            action="/upload/uploadmultiple"
            onSubmit={this.uploadMultiple}
            enctype="multipart/form-data"
            method="POST"
          >
            Select images: <input type="file" name="images" multiple />
            <input type="submit" value="Upload your files" />
          </form>
          <p>{this.state.getData}</p>
          <p>{this.state.artworks}</p>
          <ArtworkList artworks={this.state.artworks} />
          <button type="button" onClick={this.toggleArtwork}>
            Add Artwork
          </button>
          {this.state.addArtworkForm && <AddArtwork getData={this.getData} />}
          {/* <Link to={AddArtwork}>
            <button onClick={this.toggleEditForm}>Add Artwork</button>
            </Link> */}
          {/* <form action="/upload/uploadmultiple" onSubmit={this.uploadMultiple} enctype="multipart/form-data" method="POST">
  Select images: <input type="file" name="images" multiple />
  <input type="submit" value="Upload your files"/>
</form> */}
        </div>
        <Availabilities />
        <DateAdder />
      </div>
    );
  }
}
