const express = require("express");
const routes = express.Router();

// List all routes here.
// Routes are served in /app.js
const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");
const chatRoomRoutes = require("./chatRoomRoutes");

routes.use("/api/users", userRoutes);
routes.use("/api/chat", chatRoutes);
routes.use("/api/chatRooms", chatRoomRoutes);

module.exports = routes;
