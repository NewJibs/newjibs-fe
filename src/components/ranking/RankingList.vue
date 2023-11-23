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
  <div class="all_wrap">
    <div class="board_wrap">
      <h1 style="font-size: 4rem; font-family: 'NeoDunggeunmoPro'; color: yellow">Ranking</h1>
      <v-list lines="three" style="font-family: 'NeoDunggeunmoPro'">
        <v-list-item v-for="(user, rank) in data" :key="rank">
          <v-list-item-content>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
              "
            >
              <div style="display: flex; flex-direction: column">
                <v-list-item-title style="font-size: 1.5rem">
                  {{ rank }}. {{ user.email }}
                </v-list-item-title>
                <v-list-item-subtitle style="margin-left: 1.5rem">
                  이름: {{ user.name }}
                </v-list-item-subtitle>
              </div>
              <div style="margin-left: 1.5rem; font-size: 2rem; color: #5995fd">
                {{ user.point }}p
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<style scoped>
.all_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 3.9rem);
  background-image: url('@/assets/ranking-back.png');
  background-size: cover;
}

.board_wrap {
  width: 600px;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  border-radius: 3rem;
  background-color: rgba(10, 15, 32, 0.1);
}
</style>
