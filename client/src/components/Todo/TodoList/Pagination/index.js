import React from 'react'
import styles from './Pagination.module.scss'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }

  console.log('==>>', styles)
  const renderPageNumbers = getPageNumbers().map(number => {
    return (
      <li
        key={number}
        className={`${currentPage === number 
          ? styles.active 
          : ''}`}
      >
        <button
          onClick={() => onPageChange(number)}
          className={styles['page-link']}
        >
          {number}
        </button>
      </li>
    )
  })

  return (
    <nav>
      <ul className={styles.pagination}>{renderPageNumbers}</ul>
    </nav>
  )
}

export default Pagination
