const { google } = require("googleapis");
const credentials = require("./credentials.js");

const scopes = ["https://www.googleapis.com/auth/drive"];

// Authentication
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);

const drive = google.drive({ version: "v3", auth });

exports.upload = (file) => {
  drive.files.create(
    {
      resource: file,
      mimeType: "image/png",
      fields: "id",
    },
    (err, file) => {
      if (err) {
        console.error(err);
      } else {
        console.log(file);
      }
    }
  );
};
