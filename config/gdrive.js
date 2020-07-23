const { google } = require("googleapis");
const credentials = require("./credentials.js");
// const fs = require("fs");
const axios = require("axios");

const scopes = ["https://www.googleapis.com/auth/drive"];

// Authentication
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);

const drive = google.drive({ version: "v3", auth });

exports.upload = (req, res) => {
  axios
    .post(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=media",
      { data: req.body.image },
      {
        headers: {
          "Content-Type": "image/png",
          "Content-Length": req.body.image.length,
        },
      }
    )
    .then((data) => res.json(data))
    .catch((err) => console.error(err));

  // drive.files.create(
  //   {
  //     resource: {
  //       name:
  //         (1000000000 + Math.floor(Math.random() * 1000000000)).toString() +
  //         ".png",
  //     },
  //     media: {
  //       mimeType: "image/png",
  //       body: req.body.image,
  //     },
  //     fields: "id",
  //   },
  //   (err, file) => {
  //     if (err) {
  //       res.status(500).json(err);
  //     } else {
  //       res.json(file);
  //     }
  //   }
  // );
};
