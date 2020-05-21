const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Artwork = require("../models/Artwork");

router.get("/:id", (req, res) => {
  // check if req.params.id is valid, if not respond with a 4xx status code
  User.findById(req.params.id)
    .populate("artworks")
    .then((user) => {
      if (!user) {
        res.status(404).json(user);
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/:id/profile", (req, res) => {
  const {
    displayName,
    location,
    category,
    subcategory,
    availability,
    bio,
  } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    {
      displayName,
      location,
      category,
      subcategory,
      availability,
      bio,
    },
    // { new: true } ensures that we are getting the updated document in the .then callback
    { new: true }
  )
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.put("/:id/account", (req, res) => {
  const { password, email, birthDate } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    {
      password,
      email,
      birthDate,
    },
    // { new: true } ensures that we are getting the updated document in the .then callback
    { new: true }
  )
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      // Deletes all the documents in the Artwork collection where the value for the `_id` field is present in the `user.artworks` array
      Artwork.deleteMany({ _id: { $in: user.artworks } }).then(() => {
        res.status(200).json({ message: "ok" });
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
