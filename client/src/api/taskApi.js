import axios from 'axios'

const taskApi = axios.create({ 
  baseURL: process.env.REACT_APP_BACK_URL + "/tasks"
})

export const getTasks = async (limit,offset) => {
  const { data } = await taskApi.get(`?limit=${limit}&offset=${offset}`)
  return data
}

export const getCount = async () => {
  const { data } = await taskApi.get("/count")
  return data;
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

export default taskApi;