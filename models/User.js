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
  password: {
    type: String,
    required: true,
  },
  passwordResetToken: {
    type: Object,
  },
  chatting: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("User", userSchema);
