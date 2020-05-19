import React, { Component } from 'react';
import axios from 'axios';


export default class AddArtwork extends Component {

  state = {
    title: '',
    description: '',
    images:[],
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.post('/artworks', {
      title: this.state.title,
      description: this.state.description,
      images: this.state.images,

    })
      .then(() => {
        this.setState({
          title: '',
          description: '',
          images: [],
        });
        // update state in artwork by executing getData()
        this.props.getData();
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
           Title: <input type="text" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)}/>
           Description: <input type="text" name="description" value={this.state.description} onChange={(e) => this.handleChange(e)}/>
           Add Artwork <input type="submit" value="Submit"/>
            </form>
      </div>
    )
  }
}