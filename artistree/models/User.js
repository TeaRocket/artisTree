const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    imageUrl: {
      type: String,
      default: "https://res.cloudinary.com/artistree/image/upload/v1589809297/artistree/pngkey.com-avatar-png-1150152_xzp6py.png"
    },
    displayName: String,
    bio: String,
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
    },
    role: {
      type: String,
      enum: ["Artist", "Client"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Visual Artist",
        "Musician/Band",
        "Tattoo Artist",
        "Designer",
        "Sound Designer",
        "Photographer",
        "Makeup Artist",
        "Dancer",
        "Other",
      ],
    },
    subcategory: String,
    //todo add the dates where avaialble
    availability: [{ startDate: Date, endDate: Date }],
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
