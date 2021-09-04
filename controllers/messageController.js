const { google } = require("googleapis");
const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const User = mongoose.model("User");
const Message = mongoose.model("Message");
const ChatRoom = mongoose.model("ChatRoom");

exports.connectSocket = io => {
  io.on("connection", socket => {
    let roomId;

    const limitMessages = (err, messages) => {
      if (err) return console.error(err);

      const limit = 50;

      if (messages.length > limit) {
        Message.find({ roomId })
          .limit(messages.length - limit)
          .exec((err, limitedMessages) => {
            if (err) return console.error(err);

            const ids = [];
            const publicIds = [];

            limitedMessages.forEach((message, i) => {
              ids.push(message._id);
              publicIds.push(message.publicId);
            });

            Message.deleteMany({ _id: { $in: ids } }).then(info => info);

            publicIds.forEach(publicId => {
              cloudinary.uploader.destroy(
                publicId,
                { invalidate: true, folder: "chat_app_demo/upload_images" },
                (error, result) => {
                  console.log(result, error);
                }
              );
            });
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

    socket.on("join", id => {
      roomId = id;

      socket.join(roomId, () => {
        if (roomId && !(roomId.length < 24 || roomId.length > 24)) {
          ChatRoom.findOne({ _id: roomId })
            .then(chatRoom => {
              if (!chatRoom) return socket.emit("noRoom");

              Message.find({ roomId })
                .sort({ createdAt: -1 })
                .exec(limitMessages);
            })
            .catch(err => console.error(err));
        } else {
          socket.emit("noRoom");
        }
      });
    });

    socket.on("message", msg => {
      if (roomId && !(roomId.length < 24 || roomId.length > 24)) {
        ChatRoom.findOne({ _id: roomId })
          .then(chatRoom => {
            if (!chatRoom) return socket.emit("noRoom");

            const message = new Message({
              content: msg.content,
              name: msg.name,
              userId: msg.userId,
              userAuthorized: msg.userAuthorized,
              color: msg.color,
              roomId: msg.roomId
            });

            message.save(err => {
              if (err) return console.error(err);
              Message.find({ roomId })
                .sort({ createdAt: -1 })
                .exec(limitMessages);
            });

            socket.to(roomId).emit("push", message);
          })
          .catch(err => console.error(err));
      } else {
        socket.emit("noRoom");
      }
    });

    socket.on("imageUpload", msg => {
      if (roomId && !(roomId.length < 24 || roomId.length > 24)) {
        const post = {
          imageUrl: msg.imageUrl,
          imageAlt: msg.imageAlt,
          publicId: msg.publicId,
          name: msg.name,
          userId: msg.userId,
          userAuthorized: msg.userAuthorized,
          color: msg.color,
          roomId: msg.roomId
        };

        ChatRoom.findOne({ _id: roomId })
          .then(chatRoom => {
            if (!chatRoom) return socket.emit("noRoom");

            const message = new Message({
              imageUrl: msg.imageUrl,
              imageAlt: msg.imageAlt,
              publicId: msg.publicId,
              name: msg.name,
              userId: msg.userId,
              userAuthorized: msg.userAuthorized,
              color: msg.color,
              roomId: msg.roomId
            });

            message.save(err => {
              if (err) return console.error(err);
              Message.find({ roomId })
                .sort({ createdAt: -1 })
                .exec(limitMessages);
            });
          })
          .catch(err => console.error(err));

        socket.to(roomId).emit("push", post);
      } else {
        socket.emit("noRoom");
      }
    });

    socket.on("edit", msg => {
      Message.updateOne(
        { _id: msg._id },
        { $set: { content: msg.content } }
      ).then(() => true);

      socket.broadcast.emit("edited", msg);
    });

    socket.on("delete", post => {
      Message.deleteOne({ _id: post.postId }).then(() => {
        Message.find({ roomId })
          .sort({ createdAt: -1 })
          .exec(limitMessages);
      });

      socket.broadcast.emit("remove", post.postId);

      cloudinary.uploader.destroy(
        post.publicId,
        { invalidate: true, folder: "chat_app_demo/upload_images" },
        (error, result) => {
          console.log(result, error);
        }
      );
    });

    socket.on("effect", effect => {
      socket.to(roomId).broadcast.emit("effect", effect);
    });
  });
};
