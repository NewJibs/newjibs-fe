<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { instance } from '@/api/axios';

interface Notice {
  title: string
  author: string
  date: string
}

const data: Ref<Notice[]> = ref([])

const onClickGetData = () => {
  instance
    .get('/notices', {})
    .then((res) => {
      console.log('axios get 성공')
      data.value = res.data
    })
    .catch((res) => {
      console.error(res)
    })
}
</script>

<template>
  <div class="container">
    <button @click="onClickGetData()">버튼입</button>
    <table>
      <thead>
        <tr>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notice in data" :key="notice.title">
          <td>{{ notice.title }}</td>
          <td>{{ notice.author }}</td>
          <td>{{ notice.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
