import React, { useState } from 'react'
import styles from './SignIn.module.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { authSchema } from '../../schemas/validationFormik'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../../api/authApi'

const SingIn = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const handlerSettled = data => {
    if (data && !data.response) {
      localStorage.setItem('userId', data._id)
      navigate('/tasks')
      return
    } else if (data.response.status >= 400) {
      setError(data.message)
      return
    }
  }
  const handleSubmit = (values, actions) => {
    setError(null)
    if (values.action === 'SIGN_IN') {
      signInQuery.mutate(values)
      actions.resetForm()
    } else {
      signUpQuery.mutate(values)
      actions.resetForm()
    }
  }
  const signInQuery = useMutation(['user'], signIn, {
    onSettled: handlerSettled
  })
  const signUpQuery = useMutation(['user'], signUp, {
    onSettled: handlerSettled
  })

  return (
    <section>
      <Formik
        initialValues={{ email: '', password: '', action: '' }}
        validationSchema={authSchema}
        onSubmit={handleSubmit}
        on={() => setError(null)}
      >
        {({ submitForm, values, isValid }) => {
          return (
            <Form className={styles.container}>
              <Field
                className={styles.input}
                type='email'
                name='email'
                placeholder='Enter an email'
              />
              <ErrorMessage name='email' component='span' className='error' />
              <Field
                className={styles.input}
                type='password'
                name='password'
                placeholder='Ender your password'
              />
              <ErrorMessage
                name='password'
                component='span'
                className='error'
              />

              <div className={styles['btn-wrapper']}>
                <button
                  className={styles['card-btn']}
                  type='button'
                  disabled={!isValid}
                  onClick={() => {
                    values.action = 'SIGN_IN'
                    submitForm()
                  }}
                >
                  Login
                </button>
                <button
                  className={styles['card-btn']}
                  type='button'
                  disabled={!isValid}
                  onClick={() => {
                    values.action = 'SIGN_UP'
                    submitForm()
                  }}
                >
                  Create New
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
      {error && (
        <div className={styles.error}>
          <h3>{error}</h3>
        </div>
      )}
    </section>
  )
}

export default SingIn
