const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema
const messageSchema = new Schema(
  {
    content: String,
    name: String,
  },
  {
    timestamps: true,
  }
);

mongoose.model("Message", messageSchema);
