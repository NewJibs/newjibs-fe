<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { instance } from '@/util/http-common'
import { useRouter } from 'vue-router'

interface Notice {
  noticeId: number
  title: string
  author: string
  date: string
}

const data: Ref<Notice[]> = ref([])

const fetchData = () => {
  instance
    .get('/notices', {})
    .then((res) => {
      console.log('axios get성공')
      console.log(res)
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
const router = useRouter()

const viewNotice = (noticeId: number) => {
  //공지사항의 noticeId를 동적 라우트 매개변수로 넘겨 해당 페이지로 이동
  router.push({ name: 'notice', params: { noticeId: noticeId.toString() } })
}

const postNotice = () => {
  router.push({ name: 'notice-post' })
}
</script>

<template>
  <div class="container">
    <div class="title">공 지 사 항</div>
    <v-btn class="post-btn" type="submit" @click="postNotice"> 게시글 작성 </v-btn>

    <v-table class="notice-table">
      <thead>
        <tr class="table-head">
          <th class="text-center">No</th>
          <th class="text-center">제목</th>
          <th class="text-center">작성자</th>
          <th class="text-center">작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="notice in data"
          :key="notice.noticeId"
          class="table-body"
          @click="viewNotice(notice.noticeId)"
          style="cursor: pointer"
        >
          <td>{{ notice.noticeId }}</td>
          <td>{{ notice.title }}</td>
          <td>{{ notice.author }}</td>
          <td>{{ notice.date }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 3rem;
  font-weight: 500;
  margin-top: 3rem;
}

.post-btn {
  width: 10rem;
  height: 2.5rem;
  margin-top: 3rem;
  right: 0;
}

.notice-table {
  margin-top: 1rem;
  display: flex;
  width: 100%;
  z-index: 10;
}

.table-head {
  background-color: lightblue;
}

.table-body {
  text-align: center;
}
</style>
@/api/notice
