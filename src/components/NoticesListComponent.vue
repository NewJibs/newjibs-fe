<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { instance } from '@/api/axios';
import { useRouter } from 'vue-router';

interface Notice {
  notice_id: number
  title: string
  author: string
  date: string
}

const data: Ref<Notice[]> = ref([])

const fetchData = () => {
  instance
    .get('/notices', {})
    .then((res) => {
      console.log("axios get성공")
      data.value = res.data
    })
    .catch((res) => {
      console.error(res)
    })
}

//페이지 로딩하자마자 데이터 fetch 해오기
onMounted(() => {
  fetchData()
})

//클릭하면 noticeId에 해당하는 페이지로 이동
const router = useRouter();

const viewNotice = (notice_id: number) => {
  //공지사항의 noticeId를 동적 라우트 매개변수로 넘겨 해당 페이지로 이동
  router.push({name: 'notice', params: {noticeId: notice_id.toString()}})
}

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
          <!-- <th >미리보기</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="notice in data" :key="notice.title" @click="viewNotice(notice_id)">
          <td>{{ notice.title }}</td>
          <td>{{ notice.author }}</td>
          <td>{{ notice.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
