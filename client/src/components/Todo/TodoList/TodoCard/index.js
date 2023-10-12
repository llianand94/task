import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import styles from './TodoCard.module.scss'
import DataList from '../../../DataList'
import CONSTANTS from '../../../../common/constants'
import { deleteTask, updateTask } from '../../../../api/taskApi'

const TodoCard = ({ item }) => {
  const [editable, setEditable] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)
  const [status, setStatus] = useState(item.status)
  const [tags, setTags] = useState(item.tags)

  const queryClient = useQueryClient()
  const updateTaskMutation = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks')
    }
  })
  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks')
    }
  })

  const editHandler = (e) => {
    e.preventDefault()

    const value = document.getElementById('edit-btn').textContent
    if (
      value === 'Save' &&
      (title !== item.title ||
        tags !== item.tags ||
        description !== item.description ||
        status !== item.status)
    ) {
      const editedTask = {
        id: item._id,
        title,
        description,
        tags,
        status
      }
      updateTaskMutation.mutate(editedTask)
    }
    setEditable(!editable)
  }

  const deleteHandler = (e) => {
    e.preventDefault()
    
    deleteTaskMutation.mutate(item._id)
  }

  return (
    <li className={styles.card}>
      <form>
        <DataList array={CONSTANTS.existedTags} id='tags' />
        <DataList array={CONSTANTS.existedStatuses} id='statuses' />

        <textarea
          className={styles['card-header']}
          disabled={!editable}
          value={title}
          onChange={e => setTitle(e.target.value)}
        ></textarea>

        <textarea
          disabled={!editable}
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>

        <div className={styles['btn-wrapper']}>
          <button
            id='edit-btn'
            className={styles['card-btn']}
            onClick={editHandler}
          >
            {!editable ? 'Edit' : 'Save'}
          </button>
          <button
            className={styles['card-btn']}
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>

        <p>
          Date of creation: {new Date(item.createdAt).toLocaleString()}
          <br></br>
          {item.updatedAt &&
            `Updated : ${new Date(item.updatedAt).toLocaleString()}`}
        </p>
        <label>
          {' '}
          Tags :
          <input
            disabled={!editable}
            placeholder={tags}
            onChange={e => {
              setTags([e.target.value])
            }}
            list='tags'
          ></input>
        </label>
        <label>
          {' '}
          Current Status:
          <input
            disabled={!editable}
            placeholder={status}
            onChange={e => {
              setStatus(e.target.value)
            }}
            list='statuses'
          ></input>
        </label>
      </form>
    </li>
  )
}

export default TodoCard
