const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Artwork = require("../models/Artwork");
// include CLOUDINARY:
const uploader = require("../configs/cloudinarySetup");
const upload = require("../configs/multer");
const cloudinary = require("../configs/cloudinaryMultiple");
const fs = require("fs");

router.post("/single", uploader.single("imageUrl"), (req, res, next) => {
  const userId = req.user._id;
  console.log("is it loading???");

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  User.updateOne({ _id: userId }, { imageUrl: req.file.url }).then((result) => {
    res.json({ secure_url: req.file.secure_url });
  });

  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
});

router.post("/multiple", upload.array("files", 12), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images");
  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    res.status(200).json({
      message: "images uploaded successfully",
      data: urls,
    });
  } else {
    res.status(405).json({
      err: `${req.method} method not allowed`,
    });
  }
});

module.exports = router;
