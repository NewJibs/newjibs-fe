import { ref, inject } from 'vue'
import { defineStore } from 'pinia'
import { instance } from '@/util/http-common'

export const useUserStore = defineStore(
  'userStore',
  () => {
    //네브바에서 accessToken 존재유무를 알기 위해
    const accessToken = ref('') //accessToken 상태 추가

    //로그인
    const login = async (userInfo: any) => {
      //서버로 요청
      await instance.post('/members/login', userInfo).then((response) => {
        accessToken.value = response.data.accessToken //로그인 성공시 accessToken 업데이트

        instance.defaults.headers.common['Authorization'] = accessToken.value
      })
    }

    //로그아웃
    const logout = async () => {
      await instance.post('/members/logout').then(() => {
        accessToken.value = '' //로그아웃시 accessToken 제거

        instance.defaults.headers.common['Authorization'] = ''
      })
    }

    //회원정보 수정
    // const modify = async (userInfo) => {
    //   await instance.put('/members/', userInfo).then(() => {
    //     instance.defaults.headers.common['Authorization'] = ''
    //     //메뉴 바꾸기
    //   })
    // }

    //회원 탈퇴 시 axios header에 저장된 accessToken 삭제
    const withdrawal = async (userInfo: any) => {
      await instance.delete('/members/', userInfo).then(() => {
        accessToken.value = ''

        instance.defaults.headers.common['Authorization'] = ''
      })
    }

    return {
      login,
      logout,
      //   modify,
      withdrawal,
      accessToken
    }
  },
  {
    persist: {
      storage: localStorage
    }
  }
)
