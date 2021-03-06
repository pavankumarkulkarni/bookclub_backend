require("dotenv").config();
const express = require("express");
const app = express();
const {
  userCollection,
  authorCollection,
  bookCollection,
} = require("./mongodb/models");
const jwt = require("jsonwebtoken");
const bcCache = require("./util/cache");

// file upload functionality
app.route("/").get((req, res) => {
  res.status(200).send("Hello");
});

app.route("/about").get((req, res) => {
  res.status(200).send("about page");
});

// graphqL Start

function getCurrentUser(req) {
  const token = req.headers["xauthtoken"];
  if (token) {
    const value = bcCache.get(token);
    if (!value) {
      const currentUser = jwt.verify(token, process.env.JWT_SECRET);
      return { ...currentUser, token };
    }
    return null;
  }
}

const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    userCollection,
    authorCollection,
    bookCollection,
    me: getCurrentUser(req),
  }),
});

server.applyMiddleware({ app });
// graphQL End

// start mongoose
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected to mongodb");
  }
);

// end mongoose

app.listen(process.env.PORT, () => {
  console.log("Express server is running at 4000 port");
});
