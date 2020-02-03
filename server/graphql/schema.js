const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
  }

  type Hello {
    message: String!
  }

  type Tokens {
    token: String
  }

  type Query {
    currentUser: User
    currentUserRemoteGreeting: Hello
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    login(username: String, password: String!): Tokens
  }
`

module.exports = typeDefs
