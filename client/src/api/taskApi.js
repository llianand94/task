import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const taskApi = axios.create({ 
  baseURL: process.env.REACT_APP_BACK_URL + "/tasks"
})

export const getTasks = async () => {
  const { data } = await taskApi.get()
  return data
}

export const postTask = async (newTask) => {
  const response = await taskApi.post("", newTask)
  return response.data
}

export const updateTask = async (newTask) => {
  const response = await taskApi.patch("", newTask)
  return response.data
}

export const deleteTask = async (id) => {
  const response = await taskApi.delete(`${id}`)
  return response.data
}



// export function useFetchTasksQuery () {
//   return useQuery(['tasks'], getTasks)
// }



export default taskApi;