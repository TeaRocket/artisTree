import React, { Component } from 'react'
import EditArtwork from '../EditArtwork/EditArtwork';
import AddArtwork from '../AddArtwork/AddArtwork';
import ArtworkList from '../ArtworkList/ArtworkList';
import axios from 'axios';

export default class ArtworkDetails extends Component {

  state = {
    artwork: null,
    title: '',
    description: '',
    images:[],
    editForm: false,
    taskForm: false,
    error: null
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const id = this.props.match.params.id;
    axios.put(`/artworks/${id}`, {
      title: this.state.title,
      description: this.state.description,
      images: this.state.images,
    })
      .then(response => {
        this.setState({
          artwork: response.data,
          title: response.data.title,
          description: response.data.description,
          editForm: false
        })
      }).catch(err => {
        console.log(err);
      })
  }

  getData = () => {
    const id = this.props.match.params.id;
    console.log(id);
    axios.get(`/artworks/${id}`)
      .then(response => {
        this.setState({
          artwork: response.data,
          title: response.data.title,
          description: response.data.description
        });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({ error: 'Not found' })
        }
      })
  }

  deleteArtwork = () => {
    const id = this.props.match.params.id;
    axios.delete(`/artworks/${id}`)
      .then(() => {
        this.props.history.push('/artworks');
      }).catch(err => {
        console.log(err);
      })
  }

  toggleEditForm = () => {
    this.setState({
      editForm: !this.state.editForm
    });
  }

  toggleTaskForm = () => {
    this.setState({
      taskForm: !this.state.taskForm
    });
  }

  componentDidMount = () => {
    this.getData();
  }

  render() {
    console.log(this.state.taskForm);
    if (this.state.error) return <div>{this.state.error}</div>
    if (!this.state.artwork) return (<></>)

    let allowedToDelete = false;
    const user = this.props.user;
    const owner = this.state.artwork.owner;
    if (user && user._id === owner) allowedToDelete = true;

    return (
      <div>
        <h1>{this.state.artwork.title}</h1>
        <p>{this.state.artwork.description}</p>
        <button  onClick={this.deleteArtwork}>
          Delete this Artwork
          </button>
        <button onClick={this.toggleEditForm}>Show edit form</button>
        <button onClick={this.toggleTaskForm}>Show task form</button>
        {this.state.editForm && (
          <EditArtwork
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
        {this.state.taskForm && (
          <AddArtwork
            artworkId={this.state.artwork._id}
            getData={this.getData}
            hideForm={() => this.setState({ taskForm: false })}
          />
        )}
        <ArtworkList tasks={this.state.artwork.images} />
      </div>
    )
  }
}