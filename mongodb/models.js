const mongoose = require("mongoose");
const userModel = new mongoose.Schema({
  email: String,
  password: String,
});

const userCollection = mongoose.model("userCollection", userModel);
module.exports = userCollection;
