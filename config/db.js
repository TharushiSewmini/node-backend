const mongoose = require("mongoose");
require("dotenv").config();
const ConnectingDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo db connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = ConnectingDb;
