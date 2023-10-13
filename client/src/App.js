import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createContext,
  useCallback,
  useMemo,
  useState
} from 'react'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import './App.scss'
import SignInPage from './pages/signInPage'
import TodoPage from './pages/todoPage'

export const ErrorContext = createContext(null)

function App () {
  const queryClient = new QueryClient()

  const [error, setError] = useState(null)
  
  const errorHandler = useCallback(message => {
    setError(message)
  }, [])
  const contextValue = useMemo(
    () => ({
      error,
      errorHandler
    }),
    [error, errorHandler]
  )
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorContext.Provider value={contextValue}>
      <BrowserRouter>
        <article className='App'>
          <h1>My Appi Navigation Bar</h1>
          <nav>
            <ul>
              <li>
                <NavLink to='/tasks'>Tasks Page</NavLink>
              </li>
              <li>
                <NavLink to='/'>Users Page</NavLink>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path='/tasks' element={<TodoPage />} />
            <Route path='/' element={<SignInPage />} />
          </Routes>
        </article>
      </BrowserRouter>
      </ErrorContext.Provider>
    </QueryClientProvider>
  )
}

export default App
