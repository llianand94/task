import React from 'react'

const DataList = ({ array, id }) => {
  return (
    <datalist id={id}>
      {array.map((tag, i) => (
        <option value={tag} key={i}></option>
      ))}
    </datalist>
  )
}

export default DataList
