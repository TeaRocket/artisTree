import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import DateAdder from "../DateAdder/DateAdder";
import Availabilities from "../Availabilities/Availabilities";
import AddArtwork from "../AddArtwork/AddArtwork";
import ArtworkList from "../ArtworkList/ArtworkList";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { SocketContext } from "../../contexts/SocketContext";

const Profile = (props) => {
  const { user, setUser } = useContext(UserContext);
  const { socket, setSocket } = useContext(SocketContext);

  const [state, setState] = useState({
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
  });

  useEffect(() => {
    getData();
    axios.get("/api/categories").then((categories) => {
      setState({
        ...state,
        categories: categories.data,
      });
    });
  }, []);

  const handleFormChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  //change pfp
  const handleFileChange = (event) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);
    setState({ ...state, uploadOn: true });
    axios
      .post("/api/upload/single", uploadData)
      .then((response) => {
        setState({
          ...state,
          imageUrl: response.data.secure_url,
          uploadOn: false,
          editPicture: false,
        });
      })
      .catch((error) => console.log(error));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.persist();
    const availability = user.availability;
    const { displayName, bio, location, category, subcategory } = state;
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
        setState(
          {
            ...state,
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
  const getData = () => {
    const id = props.match.params.id;
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
        setState({
          ...state,
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
  const toggleEditForm = () => {
    setState({
      ...state,
      editPicture: !state.editPicture,
    });
  };
  const toggleArtwork = () => {
    setState({
      ...state,
      addArtworkForm: !state.addArtworkForm,
    });
  };
  const toggleProfileEdit = (e) => {
    e.persist();
    setState({
      ...state,
      editProfile: !state.editProfile,
    });
    if (!state.editProfile) {
      window.scrollBy({
        top: e.target.offsetTop - window.scrollY, // could be negative value
        left: 0,
        behavior: "smooth",
      });
    }
  };
  if (state.error) return <div>{state.error.toString()}</div>;
  if (!state.username) return <></>;
  const profileId = props.match.params.id;
  const allowedToEdit = user._id === profileId;
  const isArtist = user.role === "Artist";
  const profileComplete =
    state.displayName && state.bio && state.location && state.category;

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
                  backgroundImage: `url(${state.imageUrl})`,
                  height: "200px",
                  width: "200px",
                }}
                className="photo message-profile-pic"
                aria-label={state.description}
              />

              {allowedToEdit && (
                <label className="overlaybutton">
                  Edit Picture
                  <input
                    hidden
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                  />
                </label>
              )}
            </div>
            <p>{state.getData}</p>
            <h4 className="name">{state.displayName}</h4>
            {socket && (
              <div
                style={{
                  height: "10px",
                  width: "10px",
                  backgroundColor: "green",
                  borderRadius: "50%",
                }}
              ></div>
            )}

            <div className="info-div">
              {state.subcategory && <p className="info">{state.subcategory}</p>}
              {state.category && <p className="info">{state.category}</p>}
              {state.location && <p className="info">{state.location}</p>}
            </div>

            <p className="desc">{state.bio}</p>
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
                  onClick={toggleProfileEdit}
                >
                  {profileComplete ? "Edit Profile" : "Complete your profile"}
                </button>
              )}
            </div>
            {state.editProfile && (
              <form onSubmit={handleSubmit}>
                <label htmlFor="displayName">Display Name:</label>
                <input
                  className="form-input"
                  type="text"
                  name="displayName"
                  id="displayName"
                  onChange={handleFormChange}
                  value={state.displayName}
                />
                <label htmlFor="bio">Bio:</label>
                <textarea
                  className="text-input"
                  type="text"
                  name="bio"
                  id="bio"
                  value={state.bio}
                  onChange={handleFormChange}
                />
                <label htmlFor="location">Location:</label>
                <input
                  className="form-input"
                  onChange={handleFormChange}
                  type="text"
                  name="location"
                  id="location"
                  value={state.location}
                />
                {isArtist && (
                  <>
                    <label htmlFor="category">Artist Type:</label>
                    <select
                      className="select-input"
                      name="category"
                      id="category"
                      value={state.category}
                      onChange={handleFormChange}
                      style={{
                        padding: "1.3em 1.4em 1.3em 0.8em",
                        height: "50px",
                      }}
                    >
                      {state.categories.map((category) => (
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
                      value={state.subcategory}
                      onChange={handleFormChange}
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
                    artworks={state.artworks}
                    profileId={profileId}
                    className="art"
                  />
                  {allowedToEdit && isArtist && (
                    <>
                      <button
                        className="button-forms"
                        type="button"
                        onClick={toggleArtwork}
                      >
                        Add Artwork
                      </button>
                    </>
                  )}
                  {state.addArtworkForm && (
                    <AddArtwork
                      getData={getData}
                      closeForm={() => {
                        setState({ addArtworkForm: false });
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
};

export default Profile;
