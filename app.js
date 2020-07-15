const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes");
const passport = require("passport");
// const errorHandlers = require("./handlers/errorHandlers");

// create the Express app
const app = express();

// Take the raw requests and turn them into usable properties on req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Routes
app.use("/", routes);

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

//-- ERROR HANDLERS --//
// 404 Error Handler
// app.use(errorHandlers.notFound);

// Development Error Handler prints stacktrace
// if (process.env.NODE_ENV === "development") {
//   app.use(errorHandlers.developmentErrors);
// }

// Production Error Handler
// app.use(errorHandlers.productionErrors);

// PRODUCTION: serve up static files from the build folder
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Set up socket.io
const Message = mongoose.model("Message");

const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("Connected!");

  Message.find()
    .sort({ createdAt: -1 })
    .exec((err, messages) => {
      if (err) return console.error(err);

      socket.emit("init", messages);
    });

  socket.on("message", (msg) => {
    console.log("Message Sent!");

    const message = new Message({
      content: msg.content,
      name: msg.name,
    });

    message.save((err) => {
      if (err) return console.error(err);
    });

    socket.broadcast.emit("push", message);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected!");
  });
});

module.exports = server;
