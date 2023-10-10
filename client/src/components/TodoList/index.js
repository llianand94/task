import React from 'react'
import TodoCard from '../TodoCard'
import TodoForm from '../TodoForm'
import './TodoList.css'

const TodoList = ({
  tasks,
  isCreate,
  setCreate,
  onCreateHandler,
  onEditHandler,
  onDeleteHandler
}) => {
  return (
    <ol className='list'>
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

// TodoList.propTypes = {
//   tasks: []
// };

export default TodoList
