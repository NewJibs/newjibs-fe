<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
      isLoading.value = false //데이터 로딩이 완료되면 로딩 상태를 false로 변경
    })
    .catch((res) => {
      console.error(res)
      isLoading.value = false //에러가 발생하면 로딩 상태를 false로 변경
    })
}

//noticeId별 delete -> 홈화면으로 라우터 설정
const deletePost = () => {
  instance
    .delete(`/notices/${noticeId}`, {})
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
    <v-card class="mx-auto" max-width="700" style="margin-top: 2rem; padding: 2rem">
      <!-- 로딩 중이 아닐 때만 내용 표시 -->
      <div class="notice-details" v-if="data && !isLoading">
        <h1>{{ data.title }}</h1>
        <p class="author-date">{{ data.author }} | {{ data.date }}</p>
        <v-divider></v-divider>
        <div class="content" v-html="data.content"></div>
        <v-divider></v-divider>
        <div class="actions">
          <v-btn
            size="large"
            variant="tonal"
            rounded="lg"
            @click="deletePost"
            color="red"
            dark
            class="delete-btn"
            >Delete</v-btn
          >
          <v-btn size="large" variant="tonal" rounded="lg" @click="updatePost" color="primary"
            >Edit</v-btn
          >
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
notice-detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.notice-details {
  max-width: 800px;
  margin: 3rem auto;
  border: 1px solid;
  padding: 2.5rem;
  border-radius: 10px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .author-date {
    font-style: italic;
    margin-bottom: 1rem;
  }

  .content {
    margin-bottom: 2rem;
    line-height: 1.8;
    font-size: 1.5rem;
    font-weight: 350;

    p {
      margin-bottom: 1rem;
    }

    img {
      max-width: 100%;
      height: auto;
      margin-bottom: 1rem;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;

    v-btn {
      margin-left: 1rem;
      margin-right: 2rem;
    }
  }

  .delete-btn {
    margin-right: 1rem;
  }
}
</style>
