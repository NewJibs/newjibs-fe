<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { instance } from '@/util/http-common'
import { useRoute, useRouter } from 'vue-router'

interface Notice {
  noticeId: number
  title: string
  author: string
  content: string
  date: string
}

const isLoading = ref(false) //로딩 상태를 관리하는 속성
const data = ref<Notice>()
const router = useRouter()
const route = useRoute()
const noticeId = Number(route.params.noticeId) //게시글 번호

//noticeId별 정보 fetch 해오기
const loadNotice = (noticeId: number) => {
  isLoading.value = true //데이터 불러올 때
  instance
    .get(`/notices/${noticeId}`)
    .then((res) => {
      console.log('axios get 성공')
      data.value = res.data
    })
    .catch((res) => {
      console.error(res)
    })
}

//noticeId별 delete -> 홈화면으로 라우터 설정
const deletePost = () => {
  instance
    .delete(`/notices/${noticeId}`, {
      // withCredentials: true
    })
    .then(() => {
      router.push({ name: 'notices' })
    })
    .catch((error) => {
      console.error('게시물 삭제 실패', error)
    })
}

const updatePost = async () => {
  router.push({ name: 'notice-modify', params: { noticeId: noticeId.toString() } })
}

//페이지 로딩하자마자 데이터 fetch 해오기
onMounted(() => {
  if (!isNaN(noticeId)) {
    loadNotice(noticeId)
  } else {
    //noticeId가 유효하지 않을 때 처리
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <div class="notice-detail-container">
    <loading v-if="isLoading" />
    <v-container>
      <!-- 로딩 중이 아닐 때만 내용 표시 -->
      <div class="notice-details" v-if="data && !isLoading">
        <h1>{{ data.title }}</h1>
        <p>{{ data.author }} - {{ data.date }}</p>
        <div v-html="data.content"></div>
        <div class="actions">
          <v-btn @click="deletePost" color="red" dark>Delete</v-btn>
          <v-btn @click="updatePost" color="primary">Edit</v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.notice-detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.notice-details {
  max-width: 800px;
  margin: 0 auto;
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  p {
    font-style: italic;
    margin-bottom: 1rem;
  }
  .actions {
    margin-top: 1rem;
    v-btn {
      margin-right: 4rem;
    }
  }
}
</style>
@/api/notice
