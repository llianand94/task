import styles from './Todo.module.scss'
import React, { useState } from 'react'

import { getTasks } from '../../api/taskApi'
import { useQuery } from '@tanstack/react-query'
import TodoList from './TodoList'
import CreateTodoBtn from './CreateTodoBtn'

const Todo = () => {
  const [limit, setLimit] = useState(2) //totalTasksOnPage
  const [offset, setOffset] = useState(0)
  const [isCreate, setCreate] = useState(false)
  
  const {
    data: tasks,
    isLoading,
    isError,
    error
  } = useQuery(['tasks', limit, offset], () => getTasks(limit, offset), {
    keepPreviousData: true
  })

  const handleLimit = num => setLimit(num)
  const handleOffset = num => setOffset(num)

  const addButton = () => setCreate(!isCreate)
  if (isError) return <span>`Error: ${error.message}`</span>

  return (
    <div className={styles.todo}>
      <header className={styles.header}>
        <h1> TO-DO List</h1>
        <CreateTodoBtn addButton={addButton} />
      </header>

      <section>
        {isLoading && <p className={styles.loading}>loading ...</p>}
        {!isLoading && (
          <TodoList
            tasks={tasks}
            limit={limit}
            offset={offset}
            onLimitChange={handleLimit}
            onOffsetChange={handleOffset}
            isCreate={isCreate}
            setCreate={setCreate}
          />
        )}
      </section>
    </div>
  )
}

export default Todo
