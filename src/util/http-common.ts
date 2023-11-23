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

//요청 발생 시 적용할 내용
instance.defaults.headers.common['Authorization'] = ''

//인터셉터
instance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('accessToken') //토큰 가져오기
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}` // 헤더에 토큰 설정
  }
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
