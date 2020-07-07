import React, { Component } from "react";
import axios from "axios";
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
    axios.get("/api/categories").then((categories) => {
      this.setState({
        categories: categories.data,
      });
    });
  };
  componentDidUpdate = (prevProps) => {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getData();
    }
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
        .post("/api/upload/single", uploadData)
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
    event.persist();
    const { user } = this.context;
    const availability = user.availability;
    const { displayName, bio, location, category, subcategory } = this.state;
    axios
      .put(`/api/user/${user._id}/profile`, {
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
        this.setState(
          {
            displayName,
            bio,
            location,
            category,
            subcategory,
            availability,
            editProfile: false,
          },
          () => {
            window.scrollBy({
              top: -window.scrollY,
              left: 0,
              behavior: "smooth",
            });
          }
        );
      });
  };
  getData = () => {
    const id = this.props.match.params.id;
    axios
      .get(`/api/user/${id}`)
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
  toggleProfileEdit = (e) => {
    e.persist();
    this.setState(
      {
        editProfile: !this.state.editProfile,
      },
      () => {
        if (this.state.editProfile) {
          window.scrollBy({
            top: e.target.offsetTop - window.scrollY, // could be negative value
            left: 0,
            behavior: "smooth",
          });
        }
      }
    );
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
      <main className="page">
        <div className="container">
          <header className="profile-banner">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </header>
          <section>
            <div className="row">
              <div className="photo-left">
                <div
                  style={{
                    backgroundImage: `url(${this.state.imageUrl})`,
                    height: "200px",
                    width: "200px",
                  }}
                  className="photo message-profile-pic"
                  aria-label={this.state.description}
                />

                {allowedToEdit && (
                  <label className="overlaybutton">
                    Edit Picture
                    <input
                      hidden
                      type="file"
                      onChange={(e) => this.handleFileChange(e)}
                    />
                  </label>
                )}
              </div>
              <p>{this.state.getData}</p>
              <h4 className="name">{this.state.displayName}</h4>

              <div className="info-div">
                {this.state.subcategory && (
                  <p className="info">{this.state.subcategory}</p>
                )}
                {this.state.category && (
                  <p className="info">{this.state.category}</p>
                )}
                {this.state.location && (
                  <p className="info">{this.state.location}</p>
                )}
              </div>

              <p className="desc">{this.state.bio}</p>
              <div className="edit-buttons">
                <Link
                  className="my-messages button-forms"
                  to={!allowedToEdit ? `/messages/${profileId}` : "/messages"}
                >
                  {!allowedToEdit ? "Send a message" : "My messages"}
                </Link>
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
              </div>
              {this.state.editProfile && (
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="displayName">Display Name:</label>
                  <input
                    className="form-input"
                    type="text"
                    name="displayName"
                    id="displayName"
                    onChange={this.handleFormChange}
                    value={this.state.displayName}
                  />
                  <label htmlFor="bio">Bio:</label>
                  <textarea
                    className="text-input"
                    type="text"
                    name="bio"
                    id="bio"
                    value={this.state.bio}
                    onChange={this.handleFormChange}
                  />
                  <label htmlFor="location">Location:</label>
                  <input
                    className="form-input"
                    onChange={this.handleFormChange}
                    type="text"
                    name="location"
                    id="location"
                    value={this.state.location}
                  />
                  {isArtist && (
                    <>
                      <label htmlFor="category">Artist Type:</label>
                      <select
                        className="select-input"
                        name="category"
                        id="category"
                        value={this.state.category}
                        onChange={this.handleFormChange}
                        style={{
                          padding: "1.3em 1.4em 1.3em 0.8em",
                          height: "50px",
                        }}
                      >
                        {this.state.categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="subcategory">Subcategory:</label>
                      <input
                        className="form-input"
                        type="text"
                        name="subcategory"
                        id="subcategory"
                        value={this.state.subcategory}
                        onChange={this.handleFormChange}
                      ></input>
                    </>
                  )}
                  <button className="submit" type="submit">
                    Update Profile
                  </button>
                  <br></br>
                </form>
              )}
              <div className="right col-lg-8">
                <div className="row gallery">
                  <div className="col-md-4">
                    <ArtworkList
                      artworks={this.state.artworks}
                      profileId={profileId}
                      className="art"
                    />
                    {allowedToEdit && isArtist && (
                      <>
                        <button
                          className="button-forms"
                          type="button"
                          onClick={this.toggleArtwork}
                        >
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
                </div>
              </div>
            </div>
          </section>

          {user.role === "Artist" && (
            <>
              <Availabilities allowedToEdit={allowedToEdit} />
              <DateAdder allowedToEdit={allowedToEdit} />
            </>
          )}
        </div>
      </main>
    );
  }
}
