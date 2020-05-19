import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { handleUpload, saveNewArtwork } from '../service';

export default class AddArtwork extends Component {
  constructor(props) {
      super(props);
      this.state = {
        title: "",
        description: "",
        images: [],
        uploadOn: false
      };
  }
  
  handleChange = e => {  
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  // this method handles just the file upload
  handleFileUpload = e => {
      console.log("The file to be uploaded is: ", e.target.files[0]);

      const uploadData = new FormData();
      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new thing in '/api/things/create' POST route
      uploadData.append("imageUrl", e.target.files[0]);
      
      this.setState({ uploadOn: true });
      handleUpload(uploadData)
      .then(response => {
          // console.log('response is: ', response);
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
          this.setState({ imageUrl: response.secure_url, uploadOn: false });
        })
        .catch(err => {
          console.log("Error while uploading the file: ", err);
        });
  }

  // this method submits the form
  handleSubmit = e => {
      e.preventDefault();
      
      if (this.state.uploadOn) return; // do nothing if the file is still being uploaded
      saveNewArtwork(this.state)
      .then(res => {
          console.log('added: ', res);
          // here you would redirect to some other page 
      })
      .catch(err => {
          console.log("Error while adding the thing: ", err);
      });
  }  
  
  render() {
      return (
        <div>
          <h2>Artwork</h2>
          <form onSubmit={e => this.handleSubmit(e)}>
              <label>Title</label>
              <input 
                  type="text" 
                  name="title" 
                  value={ this.state.name } 
                  onChange={ e => this.handleChange(e)} />
              <label>Description</label>
              <textarea 
                  type="text" 
                  name="description" 
                  value={ this.state.description } 
                  onChange={ e => this.handleChange(e)} />
              <input 
                  type="file" 
                  onChange={(e) => this.handleFileUpload(e)} /> 
              <button type="submit" disabled={this.state.uploadOn}>Save new artwork</button>
          </form>
        </div>
      );
  }

}