const bookTypeDefs = `
type  Query{
  books:[Book]
  book(id:ID!):Book
  booksByAuthor(authorID:ID!):[Book]
}

type Mutation{
  createBook(input:bookInput!) : Book,
  reviewBook(input: reviewBookInput!):Book
}

input reviewBookInput{
  bookID:String,
  comment:String,
  rating:Int
}



input bookInput{
  image:String!
  title:String!
  authorID:String!
  genre:String!
  description:String!
}

type Book{
  id:ID!
  image:String!
  title:String!
  author:Author!
  genre:String!
  rating:Float
  description:String!
  reviews(pageNum:Int,pageSize:Int): Reviews
}

type Reviews {
  hasNext:Boolean,
  hasPrev:Boolean,
  reviews:[Review]
}

type Review{
  reviewComment:String!
  rating:Int!
  reviewedBy: User!
}

`;

module.exports = bookTypeDefs;
