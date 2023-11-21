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

const chunkData: Ref<News[][]> = ref([])
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
  // console.log('before mount')
  //전체 데이터
  const articles = await fetchData()
  data.value = reactive(articles.data)

  //청크된 데이터
  const chunkedData = chunkArray(articles.data, 3)
  chunkData.value = reactive(chunkedData)
  // console.log('data fetched')
})

// onMounted(async () => {
//   const articles = await fetchData()
//   // console.log(articles)
//   data.value = reactive(articles.data)
//   // console.log('Mounted')
// })

// onMounted(async () => {
//   //전체 데이터
//   const articles = await fetchData()
//   data.value = reactive(articles.data)

//   //청크된 데이터
//   const chunkedData = chunkArray(articles.data, 3)
//   chunkData.value = reactive(chunkedData)
// })

//3개씩 자른 chunk array
const chunkArray = (array: any[], chunkSize: number) => {
  let index = 0
  let arrayLength = array.length
  let tempArray = []

  for (index = 0; index < arrayLength; index += chunkSize) {
    let chunk = array.slice(index, index + chunkSize)
    tempArray.push(chunk)
  }

  return tempArray
}

const router = useRouter()

const viewNews = (articleId: string) => {
  router.push({
    name: 'news-detail',
    params: { articleId: articleId.toString() }
  })
}
</script>

<template>
  <!-- <div class="back">
    <h1 style="font-family: 'NeoDunggeunmoPro'">부동산 뉴스</h1>
    <div class="notice-detail-container">
      <v-carousel
        height="500"
        hide-delimiters
        cover
        show-arrows-on-hover
        cycle
        interval="3000"
        hover
      >
        <v-carousel-item
          v-for="news in data"
          :key="news.articleId"
          @click.prevent="viewNews(news.articleId)"
        >
          <v-card class="mx-auto" max-width="340">
            <v-img :src="news.thumbnail" height="200px" cover></v-img>
            <v-card-title>{{ news.title }}</v-card-title>
            <v-card-subtitle
              >{{ news.pressCorporationName }} |
              {{ new Date(news.publishDateTime).toLocaleDateString() }}</v-card-subtitle
            >
            <v-card-text>{{ news.summaryContent }}...</v-card-text>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div> -->
  <div class="back">
    <h1 style="font-family: 'NeoDunggeunmoPro'">부동산 뉴스</h1>
    <div class="notice-detail">
      <v-carousel
        height="500"
        hide-delimiters
        cover
        show-arrows="hover"
        cycle
        interval="5000"
        hover
        transition="slide-x-transition"
      >
        <v-carousel-item
          v-for="(news, index) in chunkData"
          :key="index"
          @click.prevent="viewNews(news[index].articleId)"
        >
          <v-row no-gutters>
            <v-col cols="4" v-for="item in news" :key="item.articleId">
              <v-card class="mx-auto news-card" max-width="330">
                <v-img :src="item.thumbnail" height="12.5rem" cover></v-img>
                <v-card-title>{{ item.title }}</v-card-title>
                <v-card-subtitle
                  >{{ item.pressCorporationName }} |
                  {{ new Date(item.publishDateTime).toLocaleDateString() }}</v-card-subtitle
                >
                <v-card-text>{{ item.summaryContent }}...</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </div>

    <!-- 뉴스 보드형식 -->
    <v-row align="center" justify="center">
      <v-col cols="auto" v-for="(news, index) in data" :key="index">
        <v-hover v-slot="{ isHovering }">
          <v-lazy :min-height="200" :options="{ threshold: 0.2 }" transition="fade-transition">
            <v-card
              @click.prevent="viewNews(news.articleId)"
              class="mx-auto"
              max-width="500"
              :title="news.title"
              :subtitle="news.pressCorporationName"
              :elevation="isHovering ? 12 : 2"
            >
              <template v-slot:prepend>
                <img :src="news.thumbnail" style="width: 150px; height: 100px" />
              </template>
              <v-card-text>{{ news.summaryContent }}...</v-card-text>
            </v-card>
          </v-lazy>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
.back {
  background-image: url('@/assets/news-back.png');
  background-size: cover; /* 이미지가 컨테이너에 꽉 차도록 설정 */
  background-attachment: fixed; /* 이미지 위치를 고정 */
  background-position: center center; /* 이미지를 중앙에 위치시킴 */
  background-repeat: no-repeat; /* 이미지가 반복되지 않도록 설정 */
  width: 100%; /* 너비를 화면 전체로 설정 */
  height: 100vh; /* 높이를 뷰포트 높이로 설정 */
}

.news-card {
  height: 390px;
}

.v-window.v-item-group.theme--light.v-window--horizontal
  .v-window-item.v-window-item--prev-leave-to,
.v-window.v-item-group.theme--light.v-window--horizontal
  .v-window-item.v-window-item--next-leave-to {
  opacity: 0;
  transform: translateX(0);
  transition:
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-window.v-item-group.theme--light.v-window--horizontal .v-window-item.v-window-item--next-enter,
.v-window.v-item-group.theme--light.v-window--horizontal .v-window-item.v-window-item--prev-enter {
  opacity: 0;
  transform: translateX(0);
}

.v-window.v-item-group.theme--light.v-window--horizontal
  .v-window-item.v-window-item--next-leave-active,
.v-window.v-item-group.theme--light.v-window--horizontal
  .v-window-item.v-window-item--prev-leave-active {
  transition:
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-window.v-item-group.theme--light.v-window--horizontal
  .v-window-item.v-window-item--next-enter-to,
.v-window.v-item-group.theme--light.v-window--horizontal
  .v-window-item.v-window-item--prev-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
