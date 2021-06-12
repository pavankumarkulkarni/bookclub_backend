const bookTypeDefs = `
type  Query{
  books:[Book]
  book(id:ID!):Book
  booksByAuthor(authorID:ID!):[Book]
}

type Book{
  id:ID!
  image:String!
  title:String!
  author:Author!
  genre:String!
  rating:Float
  description:String!
  reviews: [Review]
}

type Review{
  reviewComment:String!
  rating:Int!
  reviewedBy: User!
}

`;

module.exports = bookTypeDefs;
