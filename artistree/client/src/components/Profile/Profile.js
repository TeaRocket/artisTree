import React, { Component } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import DateAdder from "../DateAdder/DateAdder";
import Availabilities from "../Availabilities/Availabilities";

import AddArtwork from "../AddArtwork/AddArtwork";
import ArtworkList from "../ArtworkList/ArtworkList";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default class Profile extends Component {
  static contextType = UserContext;

  state = {
    imageUrl: null,
    username: null,
    displayName: "",
    bio: "",
    location: null,
    role: null,
    categories: [],
    category: "",
    subcategory: "",
    artworks: [],
    images: [],
    error: false,
    addArtworkForm: false,
    editPicture: false,
    uploadOn: false,
  };
  static contextType = UserContext;

  componentDidMount = () => {
    this.getData();
    axios.get("/categories").then((categories) => {
      this.setState({
        categories: categories.data,
      });
    });
  };

  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
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
    // const uploadData = new FormData();
    const { user } = this.context;
    const { displayName, bio, location, category, subcategory } = this.state;
    axios
      .put(`/user/${user._id}/profile`, {
        displayName,
        bio,
        location,
        category,
        subcategory,
      })
      .then((result) => {
        console.log(result);
      });
  };

  //upload artwork
  uploadMultiple = (event) => {
    event.preventDefault();
    const uploadData = new FormData();
    //uploadData.append('')
    console.log(event.target.files);
    const files = event.target.files;
    // Object.keys(files).forEach((key) => {
    //   uploadData.append(key, files[key]);
    // });
    for (let i = 0; i < files.length; i++) {
      uploadData.append("multipleFiles", files[i]);
    }

    for (var pair of uploadData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log(this);
    this.setState({ uploadOn: true }, () => {
      console.log(uploadData);
      axios
        .post("/upload/multiple", uploadData)
        .then((response) => {
          console.log(response.data);
          this.setState({ images: response.data.images, uploadOn: false });
        })
        .catch((error) => console.log(error));
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
      editPicture: !this.state.editPicture,
    });
  };

  toggleArtwork = () => {
    this.setState({
      addArtworkForm: !this.state.addArtworkForm,
    });
  };

  toggleProfileEdit = () => {
    this.setState({
      editProfile: !this.state.editProfile,
    });
  };

  render() {
    if (this.state.error) return <div>{this.state.error.toString()}</div>;
    if (!this.state.username) return <></>;
    let allowedToEdit = false;
    const { user } = this.context;
    //const owner = this.state.artworks.owner;
    //toggle edit picture if owner of profile
    //if (user && user._id === owner) allowedToEdit = true;
    //YYYEEEEAAAAH
    //wooooo
    return (
      <div>
        <h1>{this.state.displayName}</h1>
        <div>
          <img
            style={{ height: "200px" }}
            src={this.state.imageUrl}
            alt={this.state.displayName}
          />
          <div>
            {user._id === this.props.match.params.id && (
              <button type="button" onClick={this.toggleEditForm}>
                Edit Picture
              </button>
            )}
            {this.state.editPicture && (
              <form>
                <input type="file" onChange={(e) => this.handleFileChange(e)} />
              </form>
            )}
          </div>
        </div>
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
        <button type="button" onClick={this.toggleProfileEdit}>
          Edit Profile
        </button>
        {this.state.editProfile && (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              onChange={this.handleFormChange}
              value={this.state.displayName}
            />
            <label htmlFor="bio">Bio</label>
            <textarea
              type="text"
              name="bio"
              id="bio"
              value={this.state.bio}
              onChange={this.handleFormChange}
            />

            <label htmlFor="location">Location</label>
            <input
              onChange={this.handleFormChange}
              type="text"
              name="location"
              id="location"
              value={this.state.location}
            />
            <label htmlFor="category">Artist Type</label>
            <select
              name="category"
              id="category"
              value={this.state.category}
              onChange={this.handleFormChange}
            >
              {this.state.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <label htmlFor="subcategory">Subcategory</label>
            <input
              type="text"
              name="subcategory"
              id="subcategory"
              value={this.state.subcategory}
              onChange={this.handleFormChange}
            ></input>
            <button type="submit">Update Profile</button>
          </form>
        )}
        <p>{this.state.location}</p>
        <p>{this.state.role}</p>
        <div>
          <p>{this.state.artworks}</p>
          <ArtworkList artworks={this.state.artworks} />
          <button type="button" onClick={this.toggleArtwork}>
            Add Artwork
          </button>
          {this.state.addArtworkForm && <AddArtwork getData={this.getData} />}
          <form>
            Select images:{" "}
            <input
              type="file"
              name="multipleFiles"
              multiple
              onChange={this.uploadMultiple}
            />
            <input type="submit" value="Upload your files" />
          </form>
        </div>
        <Availabilities />
        <DateAdder />
      </div>
    );
  }
}
