const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/categories", (req, res, next) => {
  res.json(User.schema.obj.category.enum);
});

router.get("/locations", (req, res, next) => {
  User.find().then((data) => {
    const artists = data.filter((user) => user.role === "Artist");
    const locations = [
      ...new Set(artists.map((artist) => artist.location)),
    ].sort();
    res.status(200).json(locations);
  });
});

module.exports = router;
