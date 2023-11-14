<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { instance } from '@/util/http-common'
import { useRouter } from 'vue-router'

interface News {
  articleId: string
  pressCorporationName: string
  title: string
  summaryContent: string
  thumbnail?: string
  publishDateTime: string
}

const data: Ref<News[]> = ref([])

const fetchData = () => {
  instance
    .get('/news')
    .then((res) => {
      console.log('axios get 성공')
      console.log(res)
      data.value = res.data
    })
    .catch((res) => {
      console.error(res)
    })
}

onMounted(() => {
  fetchData()
})

const router = useRouter()

const viewNews = (articleId: string) => {
  router.push({
    name: 'news-detail',
    params: { articleId: articleId.toString() }
  })
}
</script>

<template>
  <div class="container">
    <!-- <v-carousel> -->
    <div class="notice-detail-container">
      <v-carousel height="800" hide-delimiter-background show-arrows cover>
        <v-container>
          <v-card
            v-for="news in data"
            :key="news.articleId"
            @click.prevent="viewNews(news.articleId)"
            hover
          >
            <v-carousel-item>
              <v-sheet height="100%">
                <v-card-item><img class="card-img" :src="news.thumbnail" /></v-card-item>
                <v-card-title class="card-title">{{ news.title }}</v-card-title>
                <v-card-subtitle
                  >{{ news.pressCorporationName }} |
                  {{ new Date(news.publishDateTime).toLocaleDateString() }}</v-card-subtitle
                >
                <v-card-text>{{ news.summaryContent }}...</v-card-text>
              </v-sheet>
            </v-carousel-item>
          </v-card>
        </v-container>
      </v-carousel>
    </div>
    <!-- </v-carousel> -->
  </div>
</template>

<style scoped>
.news-card:hover {
  cursor: pointer;
}
</style>
