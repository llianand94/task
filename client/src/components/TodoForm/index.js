import React, { useState } from 'react'
import styles from './TodoForm.module.scss'
import CONSTANTS from '../../common/constants'
import DataList from '../DataList'

function TodoForm ({ onCreateHandler, setCreate }) {
  const [title, setTitle] = useState('Title')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [userId, setUserID] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    const newTodo = {
      title,
      description,
      tags,
      userId: userId ? userId : undefined
    }

    onCreateHandler(newTodo)
    setCreate(false)

    setTitle('Title')
    setDescription('')
    setTags('')
    setUserID(undefined)
  }

  return (
    <li className={styles["form-wrapper"]}>
      <form onSubmit={handleSubmit}>
        <DataList array={CONSTANTS.existedTags} id='tags' />

        <input
          type='text'
          placeholder='Enter title text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          className={styles.description}
          value={description}
          placeholder='Description(optional)'
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type='text'
          placeholder='Tags (optional)'
          list='tags'
          onChange={e => setTags([e.target.value])}
        />
        <button className={styles['submit-btn']} type='submit'>
          Add Todo
        </button>
      </form>
    </li>
  )
}

export default TodoForm
