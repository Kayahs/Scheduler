import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Login from 'components/routes/auth/Login'
import Signup from 'components/routes/auth/Signup'
import ErrorPage from 'components/util/ErrorPage'
import Loading from 'components/util/Loading'
import { GET_AUTH_STATUS } from 'gql/queries'

const MainRouter = () => {
  const { loading, error, data } = useQuery(GET_AUTH_STATUS)
  if (loading) return <Loading />
  if (error) {
    throw error
  }
  const { isLoggedIn } = data.authStatus
  const router = createBrowserRouter([
    {
      path: '/',
      element: isLoggedIn ? <Dashboard /> : <Login />,
      errorElement: <ErrorPage />
    },
    {
      path: '/signup',
      element: isLoggedIn ? <Navigate replace to={'/'} /> : <Signup />,
      errorElement: <ErrorPage />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default MainRouter