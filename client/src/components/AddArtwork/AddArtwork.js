import React, { Component } from "react";
import axios from "axios";

export default class AddArtwork extends Component {
  state = {
    title: "",
    description: "",
    images: [],
    uploadOn: false,
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  //upload artwork
  uploadMultiple = (event) => {
    event.preventDefault();
    const uploadData = new FormData();
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      uploadData.append("files", files[i]);
    }
    this.setState({ uploadOn: true }, () => {
      axios
        .post("/api/upload/multiple", uploadData, {
          headers: { crossdomain: true, "Content-Type": "undefined" },
        })
        .then((response) => {
          const imgUrls = response.data.data.map((image) => image.url);
          this.setState({ images: imgUrls, uploadOn: false });
        })
        .catch((error) => console.log(error));
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/api/artwork", {
        title: this.state.title,
        description: this.state.description,
        images: this.state.images,
      })
      .then(() => {
        this.setState({
          title: "",
          description: "",
          images: [],
        });
        this.props.closeForm();
        // update state in artwork by executing getData()
        this.props.getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <main className="mainart-box">
        <div className="form-popup" id="myForm">
          <form className="form-art" onSubmit={this.handleSubmit}>
            <div className="con">
              <div className="field-set">
                <header className="head-form">
                  <h2>Add Artwork</h2>
                </header>
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={(e) => this.handleChange(e)}
                    className="form-input"
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={(e) => this.handleChange(e)}
                    className="form-input"
                  />
                </label>
              </div>
              <div>
                <label>
                  Select images:
                  <label className="submit" for="inputfiles">
                    Choose files
                  </label>
                  <input
                    className="invisible"
                    id="inputfiles"
                    type="file"
                    name="files"
                    multiple
                    onChange={this.uploadMultiple}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              {!this.state.uploadOn && (
                <input type="submit" value="Submit" className="submit" />
              )}
            </div>
          </form>
        </div>
      </main>
    );
  }
}
