import './Todo.css'
import React, { useEffect, useState } from 'react'
import TodoList from '../TodoList'
import CreateTodo from '../CreateTodo'

const Todo = () => {
  const [tasks, setTasks] = useState([])
  const [isCreate, setCreate] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [sortOrder, setSortOrder] = useState('DESC')

  const [itemToCreate, setItemToCreate] = useState(null)
  const [itemToEdit, setItemToEdit] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)

  useEffect(() => {
    const url = 'http://localhost:5000/api/tasks'

    if (itemToCreate) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemToCreate)
      })
        .then(d => d.json())
        .then(d => setItemToCreate(null))
    }

    if (itemToEdit) {
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemToEdit)
      })
        .then(d => d.json())
        .then(d => setItemToEdit(null))
    }

    if (itemToDelete) {
      fetch(`${url}/${itemToDelete}`, { method: 'DELETE' })
        .then(d => d.json())
        .then(d => setItemToDelete(null))
    }

    fetch(url)
      .then(d => d.json())
      .then(d => {
        setTasks(
          d.sort((a, b) => {
            a = new Date(a.createdAt).valueOf()
            b = new Date(b.createdAt).valueOf()

            return sortOrder === 'ASC' ? a - b : b - a
          })
        )
        setIsFetching(false)
      })
      .catch(e => console.log(e))
    return () => tasks
  }, [sortOrder, itemToCreate, itemToEdit, itemToDelete])

  const addButton = () => setCreate(!isCreate)
  const onCreateHandler = newTask => setItemToCreate(newTask)
  const onEditHandler = editedTask => setItemToEdit(editedTask)
  const onDeleteHandler = id => setItemToDelete(id)

  return (
    <div className='todo'>
      <header>
        <h1 className='header'> TO-DO List</h1>
        <CreateTodo addButton={addButton} />
      </header>

      <div className='wrapper'>
        {isFetching && (
          <p style={{ textAlign: 'center', fontSize: '1.5em' }}>loading ...</p>
        )}
        <TodoList
          tasks={tasks}
          isCreate={isCreate}
          setCreate={setCreate}
          onCreateHandler={onCreateHandler}
          onEditHandler={onEditHandler}
          onDeleteHandler={onDeleteHandler}
        />
      </div>
    </div>
  )
}

export default Todo
