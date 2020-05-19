const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const Artwork = require('../models/Artwork');

// include CLOUDINARY:
const uploader = require('../configs/cloudinarySetup');

router.post('/single', uploader.single("imageUrl"), (req, res, next) => {
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

router.post('/multiple', uploader.array('images', 12), (req, res, next) => {
  const files = req.files
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }
 res.json(files);
//   Artwork.update(
//     { _id: artwork._id }, 
//     { $push: { images: files } },
    
// ).then(data=>{
//   res.json({ images: req.files.images });
// });

})


module.exports = router;
