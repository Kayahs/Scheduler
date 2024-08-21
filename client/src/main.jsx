import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import App from 'App.jsx'
import 'index.css'
import apolloClient from 'config/apolloClient.js'

// apolloClient
// .query({
//   query: gql`
//     query Query {
//       getUsers {
//         fullname
//         email
//       }
//     }
//   `,
// })
// .then((result) => console.log(result));

const root = createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
)