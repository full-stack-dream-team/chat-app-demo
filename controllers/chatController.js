const mongoose = require("mongoose");
const multer = require("multer");

exports.uploadFile = (req, res) => {
  // console.log("Current directory: " + process.cwd());
  console.log(req.body);

  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./client/public");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  let upload = multer({ storage }).single("file");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
};
