import { Fragment } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { SIGNUP_MUTATION } from 'gql/mutations'
import { FormContext } from 'lib/contexts'
import { TextInput, SubmitButton } from 'components/form'
import { useMutation } from '@apollo/client'

const Signup = () => {
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION)
  const options = {
    email: {
      label: 'Please enter your email',
      type: 'email',
      name: 'email'
    },
    password: {
      label: 'Please enter your password',
      type: 'password',
      name: 'password'
    },
    fullname: {
      label: 'Please enter your name',
      type: 'text',
      name: 'fullname'
    },
    submit: {
      label: 'Create Account'
    }
  }
  return (
    <Formik
      initialValues={{
        fullname: '',
        email: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        fullname: Yup.string().required("required"),
        email: Yup.string()
          .email()
          .required("required"),
        password: Yup.string().required("required")
      })}
      onSubmit={(values, { setSubmitting }) => {
        signup({ variables: { input: values }})
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
              ".signupFormTextInput": {
                width: '60%',
                marginTop: '10px'
              }
            }}
          >
            <Fragment>
              <TextInput id="fullname" className="signupFormTextInput" />
              <TextInput id="email" className="signupFormTextInput" />
              <TextInput id="password" className="signupFormTextInput" />
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
                  <Link to='/'>Existing Account?</Link>
                </Button>
              </Box>
            </Fragment>
          </Box>
        </FormContext.Provider>
      )}
    </Formik>
  )
}

export default Signup