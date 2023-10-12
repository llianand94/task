import React, { useState } from 'react'
import styles from './SignInForm.module.scss'

const SingInForm = () => {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  // const [emailValid, setEmailValid] = useState(false)
  // const [pwdValid, setPwdValid] = useState(false)

  const handleForm = e => {
    e.preventDefault()
    const user = {
      email,
      pwd
    }
    console.log('==>', user)
    setEmail('')
    setPwd('')
  }

 

  const emaiClassName = `${styles.input} ${styles.valid}`
  const pwdClassName = `${styles.input} ${styles.valid}`

  return (
    <form className={styles.container} onSubmit={handleForm}>
      <input
        className={emaiClassName}
        value={email}
        onChange={e => setEmail(e.target.value)}
        type='text'
        name='email'
        placeholder='Enter an email'
        required
      ></input>
      <input
        className={pwdClassName}
        value={pwd}
        onChange={e => setPwd(e.target.value)}
        type='password'
        name='pwd'
        placeholder='Ender your password'
        required
      />
      <div className={styles['btn-wrapper']}>
        <input className={styles['card-btn']} type='submit' value='SIGN_IN' />
        <input className={styles['card-btn']} type='submit' value='SIGN_UP' />
      </div>
    </form>
  )
}

export default SingInForm
