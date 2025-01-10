import { Fragment } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { LOGIN_MUTATION } from 'gql/mutations'
import { FormContext } from 'lib/contexts'
import { TextInput, SubmitButton } from 'components/form'
import { useMutation } from '@apollo/client'

const Login = () => {
  const options = {
    email: {
      label: "Email",
      type: "email",
      name: "email"
    },
    password: {
      label: "Password",
      type: "password",
      name: "password"
    },
    submit: {
      label: "Login"
    }
  }
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION)

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Required"),
        password: Yup.string()
          .required("Required")
      })}
      onSubmit={(values, { setSubmitting }) => {
        login({ variables: { input: values }})
        setSubmitting(false)
      }}
    >
      {props => (
        <FormContext.Provider value={{ ...props, options }}>
          <Box 
            component="form" 
            onSubmit={props.handleSubmit}
            sx={{
              width: '80%',
              height: '50%',
              maxWidth: '500px',
              minHeight: '250px',
              padding: '20px 0',
              border: 'black 1px solid',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '5px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              ".loginFormTextInput": {
                width: '60%',
              }
            }}
          >
            <Fragment>
              <TextInput id="email" className="loginFormTextInput"/>
              <TextInput id="password" className="loginFormTextInput"/>
              <Box
                component="div"
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-around',
                  marginTop: '15px',
                  "> *": {
                    height: "40px",
                  }
                }}
                >
                <SubmitButton />
                <Button variant="contained">
                  <Link to={'/signup'}>Create an account</Link>
                </Button>
              </Box>
            </Fragment>
          </Box>
        </FormContext.Provider>
      )}
    </Formik>
  )
}

export default Login