const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Artwork = require("../models/Artwork");

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Artwork.findById(id)
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  if (req.user.role === "Artist") {
    const { title, description, images } = req.body;
    Artwork.create({
      title,
      description,
      images,
    })
      .then((artwork) => {
        return User.findByIdAndUpdate(req.user._id, {
          $push: { artworks: artwork._id },
        }).then(() => {
          res.status(201).json({
            message: `Artwork with id ${artwork._id} was successfully added to user with id ${req.user._id}`,
          });
        });
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.status(401).json({ message: "unauthorised" });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, description, images } = req.body;

  Artwork.findById(id)
    .then((artwork) => {
      if (req.user._id === artwork.owner) {
        Artwork.findByIdAndUpdate(
          id,
          { title, description, images },
          { new: true }
        )
          .then((artwork) => {
            res.json(artwork);
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.status(401).json({ message: "unauthorised" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  Artwork.findById(id)
    .then((artwork) => {
      if (req.user._id === artwork.owner) {
        Artwork.findByIdAndDelete(id).then((artwork) => {
          User.findByIdAndUpdate(artwork.owner, {
            $pull: { artworks: id },
          }).then(() => {
            res.json({ message: "ok" });
          });
        });
      } else {
        res.status(401).json({ message: "unauthorised" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
