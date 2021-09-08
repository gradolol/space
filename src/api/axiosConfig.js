import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.spacexdata.com/v3',
  timeout: 1000,
})

export default instance
