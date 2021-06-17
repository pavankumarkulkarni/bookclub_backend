const mongoose = require("mongoose");
const userModel = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});

const userCollection = mongoose.model("userCollection", userModel);
module.exports = userCollection;
