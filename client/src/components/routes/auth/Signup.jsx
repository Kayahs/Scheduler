import { Fragment } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

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
        fullname: Yup.string(),
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
          <form onSubmit={props.handleSubmit}>
            <Fragment>
              <TextInput id="fullname" />
              <TextInput id="email" />
              <TextInput id="password" />
              <SubmitButton />
              <Link to='/'>Existing Account?</Link>
            </Fragment>
          </form>
        </FormContext.Provider>
      )}
    </Formik>
  )
}

export default Signup