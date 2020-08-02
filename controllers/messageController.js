const { google } = require("googleapis");
const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
// const deleteImage = require("../config/cloudinary");

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
        userAuthorized: msg.userAuthorized,
        color: msg.color,
      });

      message.save((err) => {
        if (err) return console.error(err);
        Message.find().sort({ createdAt: -1 }).exec(limitMessages);
      });

      socket.broadcast.emit("push", message);
    });

    socket.on("imageUpload", (msg) => {
      const message = new Message({
        imageUrl: msg.imageUrl,
        imageAlt: msg.imageAlt,
        publicId: msg.publicId,
        name: msg.name,
        userId: msg.userId,
        userAuthorized: msg.userAuthorized,
        color: msg.color,
      });

      message.save((err) => {
        if (err) return console.error(err);
        Message.find().sort({ createdAt: -1 }).exec(limitMessages);
      });
    });

    // let userId;

    // socket.on("addUser", (info) => {
    //   userId = info.userId;
    //   User.updateOne({ _id: info.userId }, { $set: { chatting: true } }).then(
    //     broadcastActiveUsers
    //   );
    // });

    socket.on("edit", (msg) => {
      Message.updateOne(
        { _id: msg._id },
        { $set: { content: msg.content } }
      ).then(() => true);

      socket.broadcast.emit("edited", msg);
    });

    socket.on("delete", (post) => {
      Message.deleteOne({ _id: post.postId }).then(() => {
        Message.find().sort({ createdAt: -1 }).exec(limitMessages);
      });

      socket.broadcast.emit("remove", post.postId);

      cloudinary.uploader.destroy(
        post.publicId,
        { invalidate: true },
        (error, result) => {
          console.log(result, error);
        }
      );
    });

    socket.on("effect", (effect) => {
      socket.broadcast.emit("effect", effect);
    });

    // socket.on("disconnect", () => {
    //   User.updateOne({ _id: userId }, { $set: { chatting: false } }).then(
    //     broadcastActiveUsers
    //   );
    // });
  });
};
