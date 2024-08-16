import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import App from './App.jsx'
import './index.css'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
})

client
.query({
  query: gql`
    query Query {
      getUsers {
        fullname
        email
      }
    }
  `,
})
.then((result) => console.log(result));

const root = createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)