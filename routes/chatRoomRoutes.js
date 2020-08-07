const express = require("express");
const router = express.Router();

const chatRoomController = require("../controllers/chatRoomController");

router.post("/add", chatRoomController.addChatRoom);
router.post("/delete", chatRoomController.deleteChatRoom);

router.get("/", chatRoomController.getChatRooms);

// Export router for use
module.exports = router;
