<script setup lang="ts">
import { ref } from 'vue'
import { instance } from '@/util/http-common'
import router from '@/router'

//바인딩 변수
const title = ref('')
const content = ref('')
const imageUrl = ref('')

//날짜 형식 바꾸기
const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
// console.log(formatDate(new Date()))

//포스트 올리기
const submitPost = async (e: any) => {
  e.preventDefault()

  const currentDate = new Date()
  const formattedDate = formatDate(currentDate)

  const postData = {
    title: title.value,
    content: content.value,
    image: imageUrl.value,
    date: formattedDate
  }

  console.log(postData.date)

  try {
    // POST 요청 보내기
    const response = await instance.post('/notices', postData)

    // 요청이 성공한 경우 처리
    console.log('게시 성공', response.data)

    // 입력 필드 초기화
    title.value = ''
    content.value = ''
    imageUrl.value = ''

    //다시 notices 페이지로 이동
    router.push('/notices')
  } catch (error) {
    // 요청이 실패한 경우 처리
    console.error('게시 실패', error)
  }
}
</script>

<template>
  <div class="notice-post-container">
    <v-container>
      <div class="notice-post-form">
        <h1 class="notice-post-title">게시글 작성</h1>
        <v-form>
          <v-text-field v-model="title" label="제목" required></v-text-field>
          <v-textarea v-model="content" label="내용" required></v-textarea>
          <v-text-field v-model="imageUrl" label="이미지 URL"></v-text-field>
          <v-btn type="submit" @click="submitPost">게시</v-btn>
        </v-form>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.notice-post-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.notice-post-form {
  max-width: 800px;
  margin: 0 auto;
}

.notice-post-title {
  display: flex;
  font-size: 3rem;
  font-weight: 500;
  margin-top: 3rem;
  font-family: 'NeoDunggeunmoPro';
  text-align: center;
}
</style>
@/api/notice
