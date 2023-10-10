import React, { useState } from 'react'
import './TodoCard.css'
import DataList from '../DataList'
import CONSTANTS from '../../common/constants.js'

const TodoCard = ({ item, onEditHandler, onDeleteHandler }) => {
  const [editable, setEditable] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)
  const [status, setStatus] = useState(item.status)
  const [tags, setTags] = useState(item.tags)

  const editHandler = (e) => {
    e.preventDefault()

    const value = document.getElementById('edit-btn').textContent
    if (
      value === 'Save' &&
      (title !== item.title ||
        description !== item.description ||
        status !== item.status)
    ) {
      const editedTask = {
        id: item._id,
        title,
        description,
        status
      }
      onEditHandler(editedTask)
    }
    setEditable(!editable)
  }

  return (
    <li className='card'>
      <form>
        <DataList array={CONSTANTS.existedTags} id='tags' />
        <DataList array={CONSTANTS.existedStatuses} id='statuses' />

        <textarea
          className='card-header'
          disabled={!editable}
          value={title}
          onChange={e => setTitle(e.target.value)}
        ></textarea>

        <textarea
          disabled={!editable}
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>

        <div className='btn-wrapper'>
          <button id='edit-btn' className='card-btn' onClick={editHandler}>
            {!editable ? 'Edit' : 'Save'}
          </button>
          <button
            className='card-btn'
            onClick={() => onDeleteHandler(item._id)}
          >
            Delete
          </button>
        </div>

        <p>
          Date of creation: {new Date(item.createdAt).toLocaleString()}
          <br></br>
          {item.updatedAt && `Updated : ${new Date(item.updatedAt).toLocaleString()}`}
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
