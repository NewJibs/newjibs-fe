<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { instance } from '@/api/axios';
import { useRoute, useRouter } from 'vue-router';

interface Notice {
  noticeId: number
  title: string
  author: string
  date: string
}

const data = ref<Notice>()
const router = useRouter()
const route = useRoute()
const noticeId = Number(route.params.noticeId) //게시글 번호

//noticeId별 정보 fetch 해오기
const loadNotice = (noticeId: number) => {
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

//noticeId별 delete -> 홈화면으로 라우터 설정
const deletePost = async (noticeId: number) => {
    instance
      .delete(`/notices/${noticeId}`)
      

}

//페이지 로딩하자마자 데이터 fetch 해오기
onMounted(() => {
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
    <table>
      <thead>
        <tr>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="data" :key="data.title">
          <td>{{ data.title }}</td>
          <td>{{ data.author }}</td>
          <td>{{ data.date }}</td>
        </tr>
        <tr v-else>
          <td colspan="3">로딩 중...</td>
        </tr>
      </tbody>
    </table>
    <a-button type="primary submit" @click="deletePost">게시</a-button>

  </div>
</template>

<style scoped></style>
