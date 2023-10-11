import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.scss'
import Todo from './components/Todo'

const queryClient = new QueryClient();

function App () {
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <Todo />
      </QueryClientProvider>
    </div>
  )
}

export default App
