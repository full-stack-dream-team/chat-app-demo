const express = require("express");
const routes = express.Router();

// List all routes here.
// Routes are served in /app.js
const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");

routes.use("/api/users", userRoutes);
routes.use("/api/chat", chatRoutes);

module.exports = routes;
