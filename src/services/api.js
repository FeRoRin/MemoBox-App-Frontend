import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Laravel API base
})

export default api
