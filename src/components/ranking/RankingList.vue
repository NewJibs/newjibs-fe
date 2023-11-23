<script setup>
import { ref, onMounted } from 'vue'
import { instance } from '@/util/http-common'

// interface User {
//   email: string
//   name: string
//   point: number
// }

// interface Rankings {
//   [key: string]: User
// }

let data = ref({})

//랭킹정보 가져오기
const fetchRanking = async () => {
  await instance.get('/members/ranks').then((res) => {
    data.value = res.data
    console.log(data.value)
  })
}

onMounted(() => {
  fetchRanking()
})
</script>

<template>
  <div>
    <v-list>
      <v-list-item v-for="(user, rank) in data.value" :key="rank">
        <v-list-item-content>
          <v-list-item-title> {{ rank }}. {{ user.email }} </v-list-item-title>
          <v-list-item-subtitle>
            이름: {{ user.name }} / 포인트: {{ user.point }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped></style>
