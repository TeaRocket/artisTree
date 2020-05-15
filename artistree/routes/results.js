const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res, next) => {
  User.find().then((data) => {
    res.status(200).json(data);
  });
});

module.exports = router;
