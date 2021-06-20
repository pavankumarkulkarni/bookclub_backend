const userTypeDefs = `
extend type Mutation{
  register(input: RegistrationInput!): Boolean,
  login(input: LoginInput!):String,
  updateDisplayName(input: displayNameInput!): User!,
  logout:Boolean,
  addBookCopy(input:bookCopyInput):User! 
}

input bookCopyInput{
  bookId:String
}

input RegistrationInput{
  email:String!
  password:String!
  confirmPassword:String!
}

input LoginInput{
  email:String!
  password:String!
}

input displayNameInput{
  name:String!
}

type User{
  id:ID!
  email:String!
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
