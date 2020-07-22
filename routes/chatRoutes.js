const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

// @route POST api/chat/upload
// @desc Upload image
// @access Private
router.post("/upload", messageController.uploadImage);

// Export router for use
module.exports = router;
