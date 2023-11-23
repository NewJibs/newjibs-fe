<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { instance } from '@/util/http-common'
import { useRoute, useRouter } from 'vue-router'

interface Notice {
  noticeId: number
  title: string
  content: string
  date: string
}

const data = ref<Notice>()
const router = useRouter()
const route = useRoute()
const noticeId = Number(route.params.noticeId)

const loadNotice = (noticeId: number) => {
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

const updateNotice = async () => {
  if (!isNaN(noticeId) && data.value) {
    try {
      const response = await instance.put(`/notices/${noticeId}`, data.value, {
        withCredentials: true
      })

      console.log('게시물 수정 성공', response.data)

      // Redirect to NoticeDetail after update
      router.push({ name: 'notice', params: { noticeId: noticeId.toString() } })
    } catch (error) {
      console.error('게시물 수정 실패', error)
    }
  }
}

onMounted(() => {
  if (!isNaN(noticeId)) {
    loadNotice(noticeId)
  } else {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <div class="notice-modify-container">
    <v-container>
      <div class="notice-modify-form" v-if="data">
        <h1 class="notice-modify-title">게시글 수정</h1>
        <v-form @submit.prevent="updateNotice">
          <v-text-field v-model="data.title" label="Title" required></v-text-field>
          <v-textarea v-model="data.content" label="Content" required></v-textarea>
          <v-btn type="submit" variant="tonal" color="primary">수정</v-btn>
        </v-form>
      </div>
      <v-alert v-else> Loading... </v-alert>
    </v-container>
  </div>
</template>

<style scoped>
.notice-modify-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.notice-modify-form {
  max-width: 800px;
  margin: 0 auto;
}

.notice-modify-title {
  display: flex;
  font-size: 3rem;
  font-weight: 500;
  margin-top: 3rem;
  font-family: 'NeoDunggeunmoPro';
  text-align: center;
}
</style>
