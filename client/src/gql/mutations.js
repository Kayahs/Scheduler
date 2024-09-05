import { gql } from "@apollo/client"

export const LOGIN_MUTATION = gql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      error {
        code
        message
      }
      csrfToken
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation signupMutation($input: NewUserInput!) {
    signup(input: $input) {
      error {
        code
        message
      }
      csrfToken
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation logoutMutation {
    logout
  }
`
