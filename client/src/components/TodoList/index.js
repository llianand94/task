import React from 'react'
import TodoCard from '../TodoCard'
import TodoForm from '../TodoForm'
import styles from './TodoList.module.scss'

const TodoList = ({
  tasks,
  isCreate,
  setCreate,
  onCreateHandler,
  onEditHandler,
  onDeleteHandler
}) => {
  return (
    <ol className={styles.list}>
      {isCreate && (
        <TodoForm setCreate={setCreate} onCreateHandler={onCreateHandler}/>
      )}
      {tasks.map(item => (
        <TodoCard
          item={item}
          key={item._id}
          onEditHandler={onEditHandler}
          onDeleteHandler={onDeleteHandler}
        />
      ))}
    </ol>
  )
}

export default TodoList
