const authorTypeDefs = `
extend type  Query{
  author(id:ID!): Author
}


type Author{
  id:ID!
  name:String!
  accolades: String
}


`;

module.exports = authorTypeDefs;
