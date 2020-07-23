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

exports.upload = (req) => {
  // axios({
  //   method: "post",
  //   url: "https://www.googleapis.com/upload/drive/v3/files?uploadType=media",
  //   data: req.body.image,
  // })
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err));

  drive.files.create(
    {
      resource: {
        name:
          (1000000000 + Math.floor(Math.random() * 1000000000)).toString() +
          ".png",
      },
      media: {
        mimeType: "image/png",
        body: req.body.image,
      },
      fields: "id",
    },
    (err, image) => {
      if (err) {
        console.error(err);
      } else {
        console.log(image);
      }
    }
  );
};
