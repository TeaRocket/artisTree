const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const artworkSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: true,
  },
  description: String,
  images: [
    {
      //add default for later if we have cloudinary
      imageUrl: { 
        type: String, 
        required: true 
      },
    },
  ],
});

const Artwork = model("Artwork", artworkSchema);
module.exports = Artwork;
