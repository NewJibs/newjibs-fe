import { ref } from 'vue'
import axios from 'axios'

const SERVER_URL = ref('https://newjibs.shop')
const VERSION = ref('/v1')

export const instance = axios.create({
  baseURL: SERVER_URL.value + VERSION.value
})

instance.interceptors.request.use((config: any) => {
  return config
}),
  (error: any) => {
    return Promise.reject(error)
  }

instance.interceptors.request.use((response: any) => {
  return response
}),
  (error: any) => {
    return Promise.reject(error)
  }
