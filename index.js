const express = require("express");
const app = express();

// file upload functionality
app.route("/").get((req, res) => {
  res.status(200).send("Hello");
});

app.route("/about").get((req, res) => {
  res.status(200).send("about page");
});

// graphqL Start

const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });
// graphQL End

app.listen("4000", () => {
  console.log("Express server is running at 4000 port");
});
