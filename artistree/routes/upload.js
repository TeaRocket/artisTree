const express = require('express');
const router  = express.Router();
const User = require('../models/User');

// include CLOUDINARY:
const uploader = require('../configs/cloudinarySetup');

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
     console.log('file is: ', req.file)
     const userId = req.user._id;

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    } 
    User.updateOne({_id: userId}, {imageUrl: req.file.url})
      .then((result) =>{
        console.log(result)
        res.json({ secure_url: req.file.secure_url });
      })

    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    
})

module.exports = router;
