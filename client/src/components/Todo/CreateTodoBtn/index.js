import React from 'react';
import './CreateTodoBtn.scss';

const CreateTodoBtn = ({ addButton }) => {
  return (
    <button className='add-btn' onClick={() => addButton()}>
      Create task
    </button>
  )
}

export default CreateTodoBtn
