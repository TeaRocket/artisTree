const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Artist", "Client"],
      required: true,
    },
    //todo add the dates where avaialble
    artworks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artwork",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
