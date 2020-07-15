const express = require("express");
const routes = express.Router();

// List all routes here.
// Routes are served in /app.js
const userRoutes = require("./userRoutes");

routes.use("/api/users", userRoutes);

module.exports = routes;
