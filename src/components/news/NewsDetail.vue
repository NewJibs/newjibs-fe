<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { instance } from '@/util/http-common'
import { useRoute, useRouter } from 'vue-router'

interface NewsDetail {
  articleId: string
  pressCorporationName: string
  title: string
  contentSummary: string
  publishDateTime: string
  content: string
  imageUrl: string
  imageDesc: string
  writer: string
}

const data = ref<NewsDetail>()
const router = useRouter()
const route = useRoute()
const articleId: string = route.params.articleId as string //게시글 번호

const loadNews = (articleId: string) => {
  instance
    .get(`/news/${articleId}`)
    .then((res) => {
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

//computed를 이용해서 개행을 <br> 태그로 변환
const formatContent = computed(() => {
  return data.value?.content.replace(/\n/g, '<br>') || ''
})
</script>

<template>
  <div class="news-detail">
    <v-container>
      <div class="news-details" v-if="data">
        <h1>{{ data.title }}</h1>
        <p>
          {{ data.pressCorporationName }} |
          {{ new Date(data.publishDateTime).toLocaleDateString() }}
        </p>
        <p>{{ data.writer }}</p>
        <img :src="data.imageUrl" alt="news-image" class="news-image" />
        <p>{{ data.imageDesc }}</p>
        <div v-html="formatContent" class="news-content"></div>
      </div>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.news-detail {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  background: #f6f6f6;
}

.news-details {
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
  }

  .news-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
  }

  .news-content {
    color: #333;
    line-height: 1.6;
  }
}
</style>
