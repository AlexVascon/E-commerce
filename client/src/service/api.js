import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://myecommerceclothingproject.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem('accessToken')
  if (storedToken) config.headers.Authorization = `Bearer ${storedToken}`
  return config
})

export default instance
