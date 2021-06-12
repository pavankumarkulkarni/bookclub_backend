const userTypeDefs = `
type Mutation{
  register(input: RegistrationInput!): Boolean,
  login(input: LoginInput!):String 
}

input RegistrationInput{
  email:String!
  password:String!
  confirmPassowrd:String!
}

input LoginInput{
  email:String!
  password:String!
}

type User{
  id:ID!
  email:String!
  password:String!
  name:String
  avatar:String
  booksOwned:[BookOwned]
  booksBorrowed:[Book]
}

type BookOwned{
  book:Book
  isAvailable:Boolean!
}
`;

module.exports = userTypeDefs;
