import gql from 'graphql-tag'

export default gql`
  type Query {
    getUsers: [User]
  }

  type Mutation {
    signup(input: NewUserInput!): LoginResponse!
    login(input: LoginInput!): LoginResponse!
    logout: Boolean
  }

  type User {
    id: ID!
    fullname: String
    email: String!
    password: String!
  }

  type Error {
    code: Int
    message: String
  }

  type LoginResponse {
    error: Error
    csrfToken: String
    user: User
  }

  input NewUserInput {
    fullname: String
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`
