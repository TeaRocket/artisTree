import React, { Component } from "react";
import EditArtwork from "../EditArtwork/EditArtwork";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

export default class ArtworkDetails extends Component {
  static contextType = UserContext;

  state = {
    artwork: null,
    title: "",
    description: "",
    images: [],
    editForm: false,
    taskForm: false,
    error: null,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.artworkId;
    axios
      .put(`/api/artwork/${id}`, {
        title: this.state.title,
        description: this.state.description,
        images: this.state.images,
      })
      .then((response) => {
        this.setState({
          artwork: response.data,
          title: response.data.title,
          description: response.data.description,
          editForm: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getData = () => {
    const id = this.props.match.params.artworkId;
    axios
      .get(`/api/artwork/${id}`)
      .then((response) => {
        this.setState({
          artwork: response.data,
          title: response.data.title,
          description: response.data.description,
          images: response.data.images,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  deleteArtwork = () => {
    const id = this.props.match.params.artworkId;
    const { user } = this.context;

    axios
      .delete(`/api/artwork/${id}`)
      .then(() => {
        this.props.history.push(`/user/${user._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleEditForm = () => {
    this.setState({
      editForm: !this.state.editForm,
    });
  };

  toggleTaskForm = () => {
    this.setState({
      taskForm: !this.state.taskForm,
    });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    if (this.state.error) return <div>{this.state.error}</div>;
    if (!this.state.artwork) return <></>;
    const id = this.props.match.params.id;
    const { user } = this.context;
    return (
      <main className="artwork-page">
        <div className="container">
          <h1 className="name">{this.state.artwork.title}</h1>
          <div className="art-img">
            {this.state.images.map((img) => (
              <img className="artworks" src={img} alt="" />
            ))}
          </div>

          <p className="info">{this.state.artwork.description}</p>
          <div className="edit-buttons">
            {user._id === id && (
              <>
                <button className="buttons" onClick={this.toggleEditForm}>
                  Edit this Artwork
                </button>
                <button className="buttons" onClick={this.deleteArtwork}>
                  Delete this Artwork
                </button>
              </>
            )}
          </div>

          {this.state.editForm && (
            <EditArtwork
              {...this.state}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          )}
        </div>
      </main>
    );
  }
}
