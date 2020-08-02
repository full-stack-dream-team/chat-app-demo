const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema
const messageSchema = new Schema(
  {
    content: String,
    imageUrl: String,
    imageAlt: String,
    publicId: String,
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userAuthorized: String,
    color: String,
  },
  {
    timestamps: true,
  }
);

mongoose.model("Message", messageSchema);
