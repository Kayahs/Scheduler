import { ApolloProvider } from '@apollo/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import apolloClient from 'config/apolloClient'
import MainRouter from 'components/MainRouter'
const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const AppContainer = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ApolloProvider client={apolloClient}>
        <MainRouter />
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default AppContainer