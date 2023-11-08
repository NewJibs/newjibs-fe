<script setup lang="ts">
import { ref } from 'vue';
import { instance } from '@/api/axios';

//바인딩 변수
const title = ref('');
const author = ref('');
const content = ref('');
const imageUrl = ref('');

//날짜 형식 바꾸기
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
console.log(formatDate(new Date()))

//포스트 올리기
const submitPost = async (e: any) => {
  e.preventDefault();

  const currentDate = new Date()
  const formattedDate = formatDate(currentDate);

  const postData = {
    title: title.value,
    author: author.value,
    content: content.value,
    image: imageUrl.value,
    date: formattedDate
  };

  console.log(postData.date)

  try {
    // POST 요청 보내기
    const response = await instance.post('/notices', postData);

    // 요청이 성공한 경우 처리
    console.log('게시 성공', response.data);

    // 입력 필드 초기화
    title.value = '';
    author.value = '';
    content.value = '';
    imageUrl.value = '';
  } catch (error) {
    // 요청이 실패한 경우 처리
    console.error('게시 실패', error);
  }
};
</script>

<template>
  <div>
    <h1>포스트 페이지</h1>
    <form>
      <div>
        <label for="title">제목:</label>
        <input v-model="title" type="text" id="title" required />
      </div>
      <div>
        <label for="author">작성자:</label>
        <input v-model="author" id="author" required />
      </div>
      <div>
        <label for="content">내용:</label>
        <input v-model="content" id="content" required />
      </div>
      <div>
        <label for="image">이미지 URL:</label>
        <input v-model="imageUrl" type="text" id="image" />
      </div>
      <a-button type="primary submit" @click="submitPost">게시</a-button>
    </form>
  </div>
</template>

