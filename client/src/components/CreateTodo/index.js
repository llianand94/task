import React from 'react';
import './CreateTodo.scss';

const CreateTodo = ({ addButton }) => {
  return (
    <button className='add-btn' onClick={() => addButton()}>
      Create task
    </button>
  )
}

export default CreateTodo
