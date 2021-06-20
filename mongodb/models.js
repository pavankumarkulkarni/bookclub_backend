const mongoose = require("mongoose");
const userModel = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  booksOwned: [{ bookID: String, available: Boolean }],
  booksRented: [String],
});

const authorModel = new mongoose.Schema({
  name: String,
  accolades: String,
});

const bookModel = new mongoose.Schema({
  image: String,
  title: String,
  authorID: String,
  genre: String,
  rating: Number,
  description: String,
  reviews: [{ userID: String, comment: String, rating: Number }],
});

const userCollection = mongoose.model("userCollection", userModel);
const authorCollection = mongoose.model("authorCollection", authorModel);
const bookCollection = mongoose.model("bookCollection", bookModel);
module.exports = { userCollection, authorCollection, bookCollection };
