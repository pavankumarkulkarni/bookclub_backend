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

const mockdata = [
  { id: "1", title: "title 1", author: "author 1" },
  { id: "2", title: "title 2", author: "author 2" },
];

const typeDefs = `
type  Query{
  greet: String,
  getBooks: [Book]
}

type Book{
  id:String,
  title:String,
  author:String
}

`;
const resolvers = {
  Query: {
    greet: () => "Hello from GraphQL",
    getBooks: () => mockdata,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });
// graphQL End

app.listen("4000", () => {
  console.log("Express server is running at 4000 port");
});
