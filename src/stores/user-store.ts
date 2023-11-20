import { ref, inject } from 'vue'
import { defineStore } from 'pinia'
import { instance } from '@/util/http-common'

export const useUserStore = defineStore(
  'userStore',
  () => {
    // const axios = inject('axios')

    //로그인
    const login = async (userInfo: any) => {
      //서버로 요청
      await instance.post('/members/login', userInfo).then((response) => {
        const { accessToken } = response.data

        instance.defaults.headers.common['Authorization'] = accessToken

        //로그인을 성공하여 토큰이 정상적으로 저장된 경우 - 네브바 바꾸기
      })
    }

    //로그아웃
    // const logout = async () => {
    //   await instance.delete('/members/logout').then(() => {
    //     instance.defaults.headers.common['Authorization'] = ''
    //     //네브바 바꾸기
    //   })
    // }

    //회원정보 수정
    // const modify = async (userInfo) => {
    //   await instance.put('/members/', userInfo).then(() => {
    //     instance.defaults.headers.common['Authorization'] = ''
    //     //메뉴 바꾸기
    //   })
    // }

    //회원 탈퇴 시 axios header에 저장된 accessToken 삭제
    // const withdrawal = async (userInfo) => {
    //   await instance.delete('/members/', userInfo).then(() => {
    //     instance.defaults.headers.common['Authorization'] = ''
    //     //메뉴 바꾸기
    //   })
    // }

    return {
      login,
      // logout,
    //   modify,
    //   withdrawal
    }
  },
  {
    persist: {
      storage: localStorage
    }
  }
)
