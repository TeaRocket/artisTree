import axios from 'axios';

const handleUpload = (theFile) => {
  // console.log('file in service: ', theFile)
  return axios.post('/upload', theFile)
    .then(response => response.data)
    .catch(err => err.response.data);
}

const saveNewImg = (newImg) => {
  // console.log('new img is: ', newImg)
  return axios.post('/user/:id', newImg)
    .then(response => response.data)
    .catch(err => err.response.data);
} 

export {
  handleUpload,
  saveNewImg
}