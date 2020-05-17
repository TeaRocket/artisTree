const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res, next) => {
  User.find().then((data) => {
    const artists = data.filter((user) => user.role === "Artist");
    res.status(200).json(artists);
  });
});

module.exports = router;
