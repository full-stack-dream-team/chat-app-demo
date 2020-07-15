const mongoose = require("mongoose");

// List all models here.
// Models are served in /start.js
const User = require("./User");
const Message = require("./Message");

const models = { User, Message };

module.exports = models;
