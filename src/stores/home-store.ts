import { defineStore } from 'pinia'
import { instance } from '@/util/http-common'

export const useHomeStore = defineStore({
  id: 'homeStore',
  state: () => ({
    resultData: null
  }),
  actions: {
    //post로 no 배열에 대한 결과값을 받는 함수
    async postSelectedAptNo(aptNos: []) {
      console.log(aptNos)
      try {
        const response = await instance.post('/houses/results', aptNos)
        // API 응답을 resultData에 할당
        this.resultData = response.data
      } catch (error) {
        console.log(error)
      }
    }
  }
})
