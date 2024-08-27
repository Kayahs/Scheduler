import { ApolloProvider } from '@apollo/client'

import apolloClient from 'config/apolloClient'
import MainRouter from 'components/MainRouter'

const AppContainer = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <MainRouter />
    </ApolloProvider>
  )
}

export default AppContainer