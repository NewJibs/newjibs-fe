<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { instance } from '@/api/axios';
import { useRoute, useRouter } from 'vue-router';

interface Notice {
  noticeId: number
  title: string
  author: string
  content: string
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
const deletePost = () => {
  instance
    .delete(`/notices/${noticeId}`,{
      // withCredentials: true
    })
    .then(() => {
      router.push({ name: 'notices' })})
    .catch((error) => {
      console.error('게시물 삭제 실패', error);
    });
}

const updatePost = async () => {
  if (!isNaN(noticeId) && data.value) {
    const updatedData = { ...data.value }; // 복사해서 수정할 데이터를 생성
    updatedData.title = '새로운 제목'; // 원하는 필드를 수정
    updatedData.author = '새로운 작성자'; // 원하는 필드를 수정
    updatedData.content = '새로운 나'

    // 서버에 수정 요청 보내기
    try {
      const response = await instance.patch(`/notices/${noticeId}`, updatedData, {
        withCredentials: true,
      });

      // 수정 성공한 경우
      console.log('게시물 수정 성공', response.data);

      // 수정한 데이터를 다시 불러오기 (선택적)
      loadNotice(noticeId);
      console.log(loadNotice)
    } catch (error) {
      // 수정 실패한 경우
      console.error('게시물 수정 실패', error);
    }
  }
};

//페이지 로딩하자마자 데이터 fetch 해오기
onMounted(() => {
    if(!isNaN(noticeId)) {
        loadNotice(noticeId)
    } else {
        //noticeId가 유효하지 않을 때 처리
        router.push({name: 'home'})
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
    <a-button type="primary submit" danger @click="deletePost">삭제</a-button>
    <a-button @click="updatePost">수정</a-button>
  </div>
</template>

<style scoped></style>
