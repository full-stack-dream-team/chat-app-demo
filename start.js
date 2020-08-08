const mongoose = require("mongoose");

// import environmental variables from the .env file
require("dotenv").config();

// Connect to the Database and handle any bad connections
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// mongoose.connection.on("error", err => {
//   console.error(`${err.message}`);
// });

// Import Models
require("./models");

// Start the app
const app = require("./app");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`express is running on port ${PORT}`);
});
