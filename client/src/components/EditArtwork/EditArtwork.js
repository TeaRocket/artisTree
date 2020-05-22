import React, { Component } from "react";

export default class EditArtwork extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <h2>Edit Artwork </h2>
          <div className="con">
            <div className="field-set">
              <label htmlFor="title">Title:</label>
              <input
                className="form-input"
                type="text"
                name="title"
                id="title"
                value={this.props.title}
                onChange={(e) => this.props.handleChange(e)}
              />
              <label htmlFor="description">Description:</label>
              <input
                className="form-input"
                type="text"
                name="description"
                id="description"
                value={this.props.description}
                onChange={(e) => this.props.handleChange(e)}
              />
              <input
                className="submit"
                type="submit"
                value="Submit"
                id="submit"
              />

              <br></br>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
