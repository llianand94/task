import axios from 'axios'

const authApi = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL
})

export const signIn = async values => {
  const data = authApi
    .post('sign-in', values, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(e => e)
  return data
}

export const signUp = async values => {
  const data = await authApi
    .post('sign-up', values, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(e => e)
  return data
}
