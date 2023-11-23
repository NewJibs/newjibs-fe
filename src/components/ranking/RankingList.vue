<script setup>
import { ref, onMounted, reactive } from 'vue'
import { instance } from '@/util/http-common'

let data = reactive({})

//랭킹정보 가져오기
const fetchRanking = async () => {
  await instance.get('/members/ranks').then((res) => {
    Object.assign(data, res.data)
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
      <v-list-item v-for="(user, rank) in data" :key="rank">
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
