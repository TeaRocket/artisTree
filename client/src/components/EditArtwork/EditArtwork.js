import React, { Component } from 'react'

export default class EditArtwork extends Component {
  render() {
    return (
      <div>
        <h2>Edit Artwork: </h2>
        <form onSubmit={this.handleSubmit}>
           Title: <input type="text" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)}/>
           Description: <input type="text" name="description" value={this.state.description} onChange={(e) => this.handleChange(e)}/>
           Add Artwork <input type="submit" value="Submit"/>
            </form>
      </div>
    )
  }
}