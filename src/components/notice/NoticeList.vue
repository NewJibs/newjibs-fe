<script setup lang="ts">
import { ref, type Ref, onMounted, computed, unref } from 'vue'
import type { TableProps, TableColumnType } from 'ant-design-vue';
import { instance } from '@/api/notice.js';
import { useRouter } from 'vue-router';

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
      console.log("axios get성공")
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

//and design용
const columns: TableColumnType<Notice>[] = [
  {
    title: '제목',
    dataIndex: 'title',
  },
  {
    title: '작성자',
    dataIndex: 'author',
  },
  {
    title: '작성일시',
    dataIndex: 'date',
  },
];

// const rowSelection: TableProps['rowSelection'] = {
//   getCheckboxProps: (record: any) => ({
//     title: record.title,
//   }),
// };

//클릭하면 noticeId에 해당하는 페이지로 이동
const router = useRouter();

const viewNotice = (noticeId: number) => {
  //공지사항의 noticeId를 동적 라우트 매개변수로 넘겨 해당 페이지로 이동
  router.push({name: 'notice', params: {noticeId: noticeId.toString()}})
}

const postNotice = (e: any) => {
  router.push({name: 'notice-post'})
}

</script>

<template>
  <div>
    <a-table  :columns="columns" :data-source="data">
      <template #bodyCell="{ record, text }">
          <a @click="viewNotice(record.noticeId)">{{ text }}</a>
      </template>
    </a-table>
    <div class="container">
      <a-button type="primary" @click="postNotice">
        게시글 작성
      </a-button>
    </div>
  </div>
  <!-- <div class="container">
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notice in data" :key="notice.noticeId" @click="viewNotice(notice.noticeId)">
          <td>{{ notice.noticeId }}</td>
          <td>{{ notice.title }}</td>
          <td>{{ notice.author }}</td>
          <td>{{ notice.date }}</td>
        </tr>
      </tbody>
    </table>
    <router-link to="/notices/post">post버튼</router-link>
  </div> -->
</template>

<style scoped></style>
@/api/notice