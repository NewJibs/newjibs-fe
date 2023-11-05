<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { instance } from '@/api/axios';
import { useRoute, useRouter } from 'vue-router';

interface Notice {
  title: string
  author: string
  date: string
}

const data = ref<Notice | null>(null)
const router = useRouter()
const route = useRoute()

//noticeId별 정보 fetch 해오기
const loadNotice = (notice_id: number) => {
    instance
        .get(`/notices/${noticeId}`)
        .then((res) => {
            console.log("axios get 성공")
            data.value = res.data
        })
        .catch((res) => {
            console.error(res)
        })
}

//페이지 로딩하자마자 데이터 fetch 해오기
onMounted(() => {
    const noticeId = Number(route.params.noticeId)
    if(!isNaN(noticeId)) {
        loadNotice(noticeId)
    } else {
        //noticeId가 유효하지 않을 때 처리
        router.push({path: '/'})
    }
})

</script>
<template>
  <div class="container">
    <!-- <button @click="onClickGetData()">버튼입</button> -->
    <table>
      <thead>
        <tr>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
          <th >미리보기</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notice in data" :key="notice.title">
          <td>{{ notice.title }}</td>
          <td>{{ notice.author }}</td>
          <td>{{ notice.date }}</td>
        </tr>
        <!-- <tr>
          <td>미리보기</td>
          <td>미리보기</td>
          <td>미리보기</td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
