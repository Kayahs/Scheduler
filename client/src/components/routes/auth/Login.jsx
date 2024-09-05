import { Fragment } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import { LOGIN_MUTATION } from 'gql/mutations'
import { FormContext } from 'lib/contexts'
import { TextInput, SubmitButton } from 'components/form'
import { useMutation } from '@apollo/client'

const Login = () => {
  const options = {
    email: {
      label: "Please enter your email",
      type: "email",
      name: "email"
    },
    password: {
      label: "Please enter your password",
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
          .email()
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
          <form onSubmit={props.handleSubmit}>
            <Fragment>
              <TextInput id="email" />
              <TextInput id="password" />
              <SubmitButton />
              <Link to={'/signup'}>Create an account</Link>
            </Fragment>
          </form>
        </FormContext.Provider>
      )}
    </Formik>
  )
}

export default Login