const mongoose = require("mongoose");

const ChatRoom = mongoose.model("ChatRoom");
const Message = mongoose.model("Message");

exports.getChatRooms = (req, res) => {
  ChatRoom.find().then((chatRooms) => {
    res.json(chatRooms);
  });
};

exports.addChatRoom = (req, res) => {
  ChatRoom.findOne({ title: req.body.title }).then((chatRoom) => {
    if (chatRoom)
      return res.status(400).json({ error: "Chat room already exists!" });

    const newChatRoom = new ChatRoom(req.body);

    newChatRoom.save().then(() => {
      res.json(newChatRoom);
    });
  });
};

exports.deleteChatRoom = (req, res) => {
  Message.deleteMany({ roomId: req.body.roomId })
    .then(() => {
      ChatRoom.deleteOne({ _id: req.body.roomId })
        .then(() => res.json("Chat room deleted!"))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};
