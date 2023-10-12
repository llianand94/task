import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import Header from '../components/Header'
import SingInForm from '../components/SignInForm'

const SignInPage = () => {
  
  return (<section>
  <Header><h2> Sign-in page</h2></Header>
      <SingInForm />
  </section>
    
      
  )
}

export default SignInPage
