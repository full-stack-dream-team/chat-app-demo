const mongoose = require("mongoose");
const User = mongoose.model("User");
const Message = mongoose.model("Message");

exports.connectSocket = (io) => {
  io.on("connection", (socket) => {
    const limitMessages = (err, messages) => {
      if (err) return console.error(err);

      const limit = 100;

      if (messages.length > limit) {
        Message.find()
          .limit(messages.length - limit)
          .exec((err, limitedMessages) => {
            const ids = [];
            limitedMessages.forEach((message, i) => {
              ids.push(message._id);
            });

            Message.deleteMany({ _id: { $in: ids } });
          });

        const limitedMessages = messages
          .reverse()
          .slice(messages.length - limit)
          .reverse();
        socket.emit("init", limitedMessages);
      } else {
        socket.emit("init", messages);
      }
    };

    const broadcastActiveUsers = () => {
      User.find({ chatting: true }).exec((err, users) => {
        if (err) return console.error(err);

        socket.broadcast.emit("users", users);
      });
    };

    Message.find().sort({ createdAt: -1 }).exec(limitMessages);

    socket.on("message", (msg) => {
      const message = new Message({
        content: msg.content,
        name: msg.name,
        userId: msg.userId,
      });

      message.save((err) => {
        if (err) return console.error(err);
        Message.find().sort({ createdAt: -1 }).exec(limitMessages);
      });

      socket.broadcast.emit("push", message);
    });

    let userId;

    socket.on("addUser", (info) => {
      userId = info.userId;
      User.updateOne({ _id: info.userId }, { $set: { chatting: true } }).then(
        broadcastActiveUsers
      );
    });

    socket.on("delete", (postInfo) => {
      Message.deleteOne({ _id: postInfo.postId }).then(() => {
        Message.find().sort({ createdAt: -1 }).exec(limitMessages);
      });
    });

    // socket.on("disconnect", () => {
    //   User.updateOne({ _id: userId }, { $set: { chatting: false } }).then(
    //     broadcastActiveUsers
    //   );
    // });
  });
};