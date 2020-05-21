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
  handleFileChange = (event) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);
    this.setState({ uploadOn: true }, () => {
      axios
        .post("/upload/single", uploadData)
        .then((response) => {
          this.setState({
            imageUrl: response.data.secure_url,
            uploadOn: false,
            editPicture: false,
          });
        })
        .catch((error) => console.log(error));
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { user } = this.context;
    const availability = user.availability;
    const { displayName, bio, location, category, subcategory } = this.state;
    console.log(availability);
    axios
      .put(`/user/${user._id}/profile`, {
        displayName,
        bio,
        location,
        category,
        subcategory,
        availability,
      })
      .then((result) => {
        const {
          displayName,
          bio,
          location,
          category,
          subcategory,
          availability,
        } = result.data;
        this.setState({
          displayName,
          bio,
          location,
          category,
          subcategory,
          availability,
          editProfile: false,
        });
      });
  };
  getData = () => {
    const id = this.props.match.params.id;
    axios
      .get(`/user/${id}`)
      .then((response) => {
        const {
          displayName,
          bio,
          location,
          category,
          subcategory,
          availability,
          imageUrl,
          username,
          artworks,
          role,
        } = response.data;
        this.setState({
          displayName,
          bio,
          location,
          category,
          subcategory,
          availability,
          imageUrl,
          username,
          artworks,
          role,
        });
      })
      .catch((error) => {
        console.log(error);
        // if (error.response.status === 404) {
        //   this.setState({ error: "Not found" });
        // }
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
    const { user } = this.context;
    const profileId = this.props.match.params.id;
    const allowedToEdit = user._id === profileId;
    const isArtist = user.role === "Artist";
    const profileComplete =
      this.state.displayName &&
      this.state.bio &&
      this.state.location &&
      this.state.category;

    return (
      <>
        <Nav />
        <div class="page">
          <div class="container">
            <header class="profile-banner">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </header>
            <main>
              <div class="row">
                <div class="left col-lg-4">
                  <div class="photo-left">
                    <img
                      class="photo"
                      style={{ height: "200px" }}
                      src={this.state.imageUrl}
                      alt={this.state.displayName}
                    />
                    {!allowedToEdit ? (
                      <Link to={`/messages/${profileId}`}>Send a message</Link>
                    ) : (
                      <Link to={`/messages`}>My messages</Link>
                    )}
                    <div>
                      {allowedToEdit && (
                        <button type="button" onClick={this.toggleEditForm}>
                          Edit Picture
                        </button>
                      )}
                      {this.state.editPicture && (
                        <form>
                          <input
                            type="file"
                            onChange={(e) => this.handleFileChange(e)}
                          />
                        </form>
                      )}
                    </div>
                  </div>
                  <h4 class="name">{this.state.displayName}</h4>
                  <p class="info">{this.state.category}</p>
                  <p class="info">{this.state.subcategory}</p>
                  <p class="info">{this.state.location}</p>
                </div>
              </div>
            </main>

            <p>{this.state.getData}</p>
            {allowedToEdit && (
              <button
                className={
                  profileComplete
                    ? "button-edit-profile"
                    : "button-complete-profile"
                }
                type="button"
                onClick={this.toggleProfileEdit}
              >
                {profileComplete ? "Edit Profile" : "Complete your profile"}
              </button>
            )}
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
                {isArtist && (
                  <>
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
                  </>
                )}
                <button type="submit">Update Profile</button>
              </form>
            )}

            <p>{this.state.bio}</p>

            <div>
              <ArtworkList
                artworks={this.state.artworks}
                profileId={profileId}
              />
              {allowedToEdit && isArtist && (
                <>
                  <button type="button" onClick={this.toggleArtwork}>
                    Add Artwork
                  </button>
                </>
              )}
              {this.state.addArtworkForm && (
                <AddArtwork
                  getData={this.getData}
                  closeForm={() => {
                    this.setState({ addArtworkForm: false });
                  }}
                />
              )}
            </div>
            {user.role === "Artist" && (
              <>
                <Availabilities allowedToEdit={allowedToEdit} />
                <DateAdder allowedToEdit={allowedToEdit} />
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
