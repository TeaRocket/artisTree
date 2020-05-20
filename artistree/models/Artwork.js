const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const artworkSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: true,
  },
  description: String,
  images: [String],
});

const Artwork = model("Artwork", artworkSchema);
module.exports = Artwork;
