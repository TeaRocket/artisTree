const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Artwork = require("../models/Artwork");


router.get('/:id', (req, res) => {
  // check if req.params.id is valid, if not respond with a 4xx status code
  User.findById(req.params.id)
    .populate('artworks')
    .then(user => {
      if (!user) {
        res.status(404).json(user);
      } else {
        res.json(user);
      }
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;