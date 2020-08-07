const mongoose = require("mongoose");

// List all models here.
// Models are served in /start.js
const User = require("./User");
const Message = require("./Message");
const ChatRoom = require("./ChatRoom");

const models = { User, Message, ChatRoom };

module.exports = models;
