const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: String,
  password: {
    type: String,
    required: true,
  },
  passwordResetToken: {
    type: Object,
  },
  authorized: String,
  banned: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("User", userSchema);
