import React, { Component } from "react";

export default class EditArtwork extends Component {
  render() {
    return (
      <div>
        <h2>Edit Artwork: </h2>
        <form onSubmit={this.props.handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={this.props.title}
            onChange={(e) => this.props.handleChange(e)}
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={this.props.description}
            onChange={(e) => this.props.handleChange(e)}
          />
          <label htmlFor="submit">Add Artwork</label>
          <input type="submit" value="Submit" id="submit" />
        </form>
      </div>
    );
  }
}
