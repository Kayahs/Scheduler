import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, from } from '@apollo/client'
import { onError } from "@apollo/client/link/error";

let apolloClient = null
const appCache = new InMemoryCache()

const buildAuthState = csrfToken => ({
  authStatus: {
    __typename: "authStatus",
    id: "authValue",
    csrfToken,
    isLoggedIn: csrfToken != null
  }
})

const setCSRFToken = csrfToken => {
  appCache.writeData({ data: buildAuthState(csrfToken) })
  if (!csrfToken) {
    localStorage.removeItem("token")
  } else {
    localStorage.setItem("token", csrfToken)
  }
}

const authorizedFetch = (uri, options) => {
  // get the authentication token from local storage if it exists local storage
  const token = localStorage.getItem("token")

  // return the headers to the context so httpLink can read them
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : ""
  }

  return fetch(uri, {
    ...options,
    headers
  })
}

const httpLink = new HttpLink({
  uri: "http://localhost:8080/graphql",
  credentials: "include",
  fetch: authorizedFetch
})

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
})

const authLink = new ApolloLink((operation, forward) => {
  const responses = forward(operation)

  return responses.filter(response => {
    // Handle log in/sign up responses
    const data = response.data || {}
    const { csrfToken } = data.login || data.signup || {}
    if (csrfToken != null) {
      setCSRFToken(csrfToken)
      console.log("logged in")
    }
    if (data.logout) {
      setCSRFToken(null)
      console.log("logged out")
    }
    // Handle auth errors and filter them out of responses
    if (response.errors == null) {
      return true
    }
    const authError = response.errors.some(
      err => err.extensions.code === "UNAUTHENTICATED"
    )
    if (authError) {
      console.log("unauthenticated")
      setCSRFToken(null)
    }
    return !authError
  })
})

apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: appCache,
})

export default apolloClient