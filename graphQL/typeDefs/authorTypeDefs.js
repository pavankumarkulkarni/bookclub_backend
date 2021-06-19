const authorTypeDefs = `
extend type  Query{
  author(id:ID!): Author
}

extend type Mutation{
  addAuthor(input:authorInput!):Author
}

input authorInput {
  name:String!
  accolades: String
}


type Author{
  id:ID!
  name:String!
  accolades: String
}


`;

module.exports = authorTypeDefs;
