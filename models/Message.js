const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema
const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Message", messageSchema);
