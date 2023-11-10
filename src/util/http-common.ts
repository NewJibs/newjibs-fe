import axios from 'axios'

const { SERVER_URL, SERVER_VERSION } = import.meta.env

export const instance = axios.create({
  baseURL: 'https://newjibs.shop/v1',
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
