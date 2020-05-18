import axios from 'axios';

const handleUpload = (theFile) => {
  // console.log('file in service: ', theFile)
  return axios.post('/upload', theFile)
    .then(response => response.data)
    .catch(err => err.response.data);
}

const saveNewArtwork = (newArtwork) => {
  // console.log('new artwork is: ', newArtwork)
  return axios.post('/artworks/create', newArtwork)
    .then(response => response.data)
    .catch(err => err.response.data);
} 

export {
  handleUpload,
  saveNewArtwork
}