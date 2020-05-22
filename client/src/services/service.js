import axios from "axios";

const handleUpload = (theFile) => {
  return axios
    .post("/api/upload", theFile)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

const saveNewImg = (newImg) => {
  return axios
    .post("/api/user/:id", newImg)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export { handleUpload, saveNewImg };
