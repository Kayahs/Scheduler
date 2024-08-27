import { gql } from "@apollo/client"

export const GET_AUTH_STATUS = gql`
  query {
    authStatus {
      isLoggedIn
    }
  }
`