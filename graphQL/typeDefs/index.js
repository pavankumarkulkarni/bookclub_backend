const typeDefs = `
type  Query{
  books:[Book]
  book(id:ID!):Book
}

type Book{
  id:ID!
  image:String!
  title:String!
  author:String!
  genre:String!
  rating:Float
  description:String!
}

`;

module.exports = typeDefs;
