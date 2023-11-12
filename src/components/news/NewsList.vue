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
</script>

<template>
  <div></div>
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
