import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import './App.scss'
import SignInPage from './pages/signInPage'
import TodoPage from './pages/todoPage'

function App () {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
    
  )
}

export default App
