const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");

router.post("/upload", chatController.uploadFile);

module.exports = router;
