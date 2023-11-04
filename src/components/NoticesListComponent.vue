<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { instance } from '@/api/axios';
import { useRouter } from 'vue-router';

interface Notice {
  title: string
  author: string
  date: string
}

const data: Ref<Notice[]> = ref([])

// const onClickGetData = () => {
//   instance
//     .get('/notices', {})
//     .then((res) => {
//       console.log('axios get 성공')
//       data.value = res.data
//     })
//     .catch((res) => {
//       console.error(res)
//     })
// }

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

const viewNotice = (noticeId: number) => {
  //공지사항의 noticeId를 동적 라우트 매개변수로 넘겨 해당 페이지로 이동
  router.push({name: 'notice', params: {noticeId: noticeId.toString()}})
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
        <tr v-for="notice in data" :key="notice.title" @click="viewNotice(noticeId)">
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
