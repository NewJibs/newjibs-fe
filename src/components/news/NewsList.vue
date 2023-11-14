<script setup lang="ts">
import { ref, type Ref, onBeforeMount, onMounted } from 'vue'
import { instance } from '@/util/http-common'
import { useRouter } from 'vue-router'
import { VCarousel } from 'vuetify/components'
import { toRefs } from 'vue'
import { reactive } from 'vue'

interface News {
  articleId: string
  pressCorporationName: string
  title: string
  summaryContent: string
  thumbnail?: string
  publishDateTime: string
}

const data: Ref<News[]> = ref([])

const fetchData = async () => {
  return await instance.get('/news')
  // .then((res) => {
  //   console.log('axios get 성공')
  // })
  // .catch((res) => {
  //   console.error(res)
  // })
}

onBeforeMount(async () => {
  console.log('before mount')
  // await fetchData()
  console.log('data fetched')
})

onMounted(async () => {
  const articles = await fetchData()
  console.log(articles)
  data.value = reactive(articles.data)
  console.log('Mounted')
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
      <v-carousel height="800" hide-delimiter-background cover>
        <v-container>
          <v-carousel-item
            v-for="news in data"
            :key="news.articleId"
            @click.prevent="viewNews(news.articleId)"
            hover
          >
            <v-sheet height="100%">
              <v-card>
                <v-card-item><img class="card-img" :src="news.thumbnail" /></v-card-item>
                <v-card-title class="card-title">{{ news.title }}</v-card-title>
                <v-card-subtitle
                  >{{ news.pressCorporationName }} |
                  {{ new Date(news.publishDateTime).toLocaleDateString() }}</v-card-subtitle
                >
                <v-card-text>{{ news.summaryContent }}...</v-card-text>
              </v-card>
            </v-sheet>
          </v-carousel-item>
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
