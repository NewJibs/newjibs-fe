<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { instance } from '@/util/http-common'
import { useRoute, useRouter } from 'vue-router'

interface NewsDetail {
  articleId: string
  pressCorporationName: string
  title: string
  publishDateTime: string
  content: string
  imgUrl: string
  imageDesc: string
  writer: string
}

const data = ref<NewsDetail>()
const router = useRouter()
const route = useRoute()
const articleId: string = route.params.articleId as string //게시글 번호

const loadNews = (articleId: string) => {
  instance
    .get(`/notices/${articleId}`)
    .then((res) => {
      console.log('axios get 성공')
      data.value = res.data
    })
    .catch((res) => {
      console.error(res)
    })
}

onMounted(() => {
  if (articleId) {
    loadNews(articleId)
  } else {
    //noticeId가 유효하지 않을 때 처리
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <div></div>
</template>

<style scoped></style>
