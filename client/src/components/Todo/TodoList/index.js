import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getCount } from '../../../api/taskApi'
import Pagination from './Pagination'
import TodoCard from './TodoCard'
import TodoForm from './TodoForm'
import styles from './TodoList.module.scss'

const TodoList = ({
  tasks,
  limit,
  offset,
  isCreate,
  setCreate,
  onOffsetChange
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  
const { data: length } = useQuery(["count"], getCount)
const totalTasksOnPage = limit;
  const totalPages = Math.ceil(length / limit)

  const handlerPageChange = page => {
    const indexFirst = page === 1 ? 0 : (page - 1) * totalTasksOnPage

    onOffsetChange(indexFirst)
    setCurrentPage(page)
  }

  return (
    <ol className={styles.list}>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlerPageChange}
      />
      {isCreate && <TodoForm setCreate={setCreate} />}
      {tasks.map(item => (
        <TodoCard item={item} key={item._id} />
      ))}
    </ol>
  )
}

export default TodoList
