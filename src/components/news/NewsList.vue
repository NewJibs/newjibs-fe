<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { instance } from '@/util/http-common'
import { useRouter } from 'vue-router'

interface News {
  articleId: string
  pressCorporationName: string
  title: string
  summaryContent: string
  thumbnail: string
  publishDateTime: string
}

const data: Ref<News[]> = ref([])

const fetchData = () => {
  instance
    .get('/news')
    .then((res) => {
      console.log('axios get 성공')
      console.log(res)
      data.value = res.data
    })
    .catch((res) => {
      console.error(res)
    })
}

onMounted(() => {
  fetchData()
})

const router = useRouter()

const viewNews = (articleId: string) => {
  router.push({ name: 'news-detail', params: { articleId: articleId.toString() } })
}
</script>

<template>
  <div class="container">
    <h1>부동산 뉴스</h1>
    <v-table class="notice-table">
      <thead>
        <tr class="table-head">
          <th class="text-center">제목</th>
          <th class="text-center">매체</th>
          <th class="text-center">작성일</th>
          <th class="text-center">요약</th>
          <th class="text-center">썸네일</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="news in data"
          :key="news.articleId"
          class="table-body"
          @click="viewNews(news.articleId)"
        >
          <td>{{ news.title }}</td>
          <td>{{ news.pressCorporationName }}</td>
          <td>{{ news.publishDateTime }}</td>
          <td>{{ news.summaryContent }}</td>
          <td><img :src="news.thumbnail" /></td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <!-- <div class="notice-detail-container">
    <v-container>
      <v-card class="notice-card" v-if="data">
        <v-card-title>{{ data.title }}</v-card-title>
        <v-card-subtitle>{{ data.author }} - {{ data.date }}</v-card-subtitle>
        <v-card-text>{{ data.content }}</v-card-text>
        <v-card-actions>
          <v-btn @click="deletePost" color="red" dark>Delete</v-btn>
          <v-btn @click="updatePost" color="primary">Edit</v-btn>
        </v-card-actions>
      </v-card>
      <v-alert v-else> Loading... </v-alert>
    </v-container>
  </div> -->
</template>

<style scoped></style>
