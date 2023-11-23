<script setup>
import { ref, onMounted, reactive } from 'vue'
import { instance } from '@/util/http-common'

let data = reactive({})

//랭킹정보 가져오기
const fetchRanking = async () => {
  await instance.get('/members/ranks').then((res) => {
    Object.assign(data, res.data)
  })
}

onMounted(() => {
  fetchRanking()
})
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 3rem;
      border: 1px solid
      
    "
  >
    <h1 style="font-size: 3rem; font-family: 'NeoDunggeunmoPro';">Ranking</h1>
    <v-list lines="three" style="font-family: 'NeoDunggeunmoPro';">
      <v-list-item v-for="(user, rank) in data" :key="rank">
        <v-list-item-content>
          <div
            style="display: flex; justify-content: space-between; align-items: center; width: 100%"
          >
            <div style="display: flex; flex-direction: column;">
            <v-list-item-title style="font-size: 1.5rem">
              {{ rank }}. {{ user.email }}
            </v-list-item-title>
            <v-list-item-subtitle style="margin-left: 1.5rem;"> 이름: {{ user.name }} </v-list-item-subtitle>
            </div>
            <div style="margin-left: 1.5rem; font-size: 2rem; color:#5995fd">{{ user.point }}p</div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped></style>
