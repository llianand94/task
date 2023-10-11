import styles from './Todo.module.scss'
import React, { useState } from 'react'
import TodoList from '../TodoList'
import CreateTodo from '../CreateTodo'
import { getTasks } from '../../api/taskApi'
import { useQuery } from '@tanstack/react-query'

const Todo = () => {
  const [isCreate, setCreate] = useState(false)
  const {
    data: tasks,
    isLoading,
    isError,
    error
  } = useQuery(['tasks'], getTasks, {
    staleTime: 30000,
    select: data =>
      data.sort(
        (a, b) =>
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      )
  })

  const addButton = () => setCreate(!isCreate)
  if (isError) return <span>`Error: ${error.message}`</span>

  return (
    <div className={styles.todo}>
      <header className={styles.header}>
        <h1> TO-DO List</h1>
        <CreateTodo addButton={addButton} />
      </header>

      <div>
        {isLoading && <p className={styles.loading}>loading ...</p>}
        {!isLoading && (
          <TodoList tasks={tasks} isCreate={isCreate} setCreate={setCreate} />
        )}
      </div>
    </div>
  )
}

export default Todo
