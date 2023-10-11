import React from 'react'
import TodoCard from '../TodoCard'
import TodoForm from '../TodoForm'
import styles from './TodoList.module.scss'

const TodoList = ({
  tasks,
  isCreate,
  setCreate,
}) => {
  return (
    <ol className={styles.list}>
      {isCreate && (
        <TodoForm setCreate={setCreate} />
      )}
      {tasks.map(item => (
        <TodoCard
          item={item}
          key={item._id}
        />
      ))}
    </ol>
  )
}

export default TodoList
