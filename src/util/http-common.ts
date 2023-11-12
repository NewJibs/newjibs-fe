import axios from 'axios'

const { VITE_SERVER_URL, VITE_SERVER_VERSION } = import.meta.env

export const instance = axios.create({
  baseURL: VITE_SERVER_URL + VITE_SERVER_VERSION,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  //cors 설정
  withCredentials: true
})

//인터셉터
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
