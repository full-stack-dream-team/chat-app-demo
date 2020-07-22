const { google } = require("googleapis");
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const GoogleDriveStorage = require("multer-google-drive");

const mongoose = require("mongoose");
const User = mongoose.model("User");
const Message = mongoose.model("Message");

exports.connectSocket = (io) => {
  io.on("connection", (socket) => {
    const limitMessages = (err, messages) => {
      if (err) return console.error(err);

      const limit = 50;

      if (messages.length > limit) {
        Message.find()
          .limit(messages.length - limit)
          .exec((err, limitedMessages) => {
            if (err) return console.error(err);

            const ids = [];
            limitedMessages.forEach((message, i) => {
              ids.push(message._id);
            });

            Message.deleteMany({ _id: { $in: ids } }).then((info) => info);
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

    // const broadcastActiveUsers = () => {
    //   User.find({ chatting: true }).exec((err, users) => {
    //     if (err) return console.error(err);
    //
    //     socket.broadcast.emit("users", users);
    //   });
    // };

    Message.find().sort({ createdAt: -1 }).exec(limitMessages);

    socket.on("message", (msg) => {
      const message = new Message({
        content: msg.content,
        name: msg.name,
        userId: msg.userId,
        image: msg.image,
      });

      message.save((err) => {
        if (err) return console.error(err);
        Message.find().sort({ createdAt: -1 }).exec(limitMessages);
      });

      socket.broadcast.emit("push", message);
    });

    let userId;

    // socket.on("addUser", (info) => {
    //   userId = info.userId;
    //   User.updateOne({ _id: info.userId }, { $set: { chatting: true } }).then(
    //     broadcastActiveUsers
    //   );
    // });

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

exports.uploadImage = (file) => {
  const drive = google.drive({
    version: "v3",
    auth: "../config/gdrive-auth.json",
  });

  // console.log(file);

  const upload = multer({
    storage: GoogleDriveStorage({
      drive: drive,
      parents: "id-parents",
      fileName: function (req, file, cb) {
        let filename = `test-${file.originalname}`;
        cb(null, filename);
      },
    }),
  });

  upload.single("file"),
    function (req, res, next) {
      res.send("Success!");
    };
};
