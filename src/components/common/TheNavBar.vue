<script setup lang="ts">
import { useUserStore } from '@/stores/user-store'

const userStore = useUserStore()
</script>

<template>
  <v-app-bar scroll-behavior="elevate" class="app-bar">
    <v-tabs background-color="primary" slider-color="#5995fd" class="app-bar-tab">
      <v-tab class="app-tab" :to="{ name: 'home' }"> >NewJibs</v-tab>
      <v-tab class="app-tab" :to="{ name: 'maps' }">지도</v-tab>
      <v-tab class="app-tab" :to="{ name: 'ranking' }">랭킹</v-tab>
      <v-tab class="app-tab" :to="{ name: 'notices' }">공지사항</v-tab>
      <v-tab class="app-tab" :to="{ name: 'news' }">뉴스</v-tab>
    </v-tabs>
    <v-spacer></v-spacer>
    <v-tabs background-color="primary" slider-color="transparent" class="app-bar-tab">
      <v-tab class="app-tab" v-if="!userStore.accessToken" :to="{ name: 'user-login' }"
        >회원가입 / 로그인</v-tab
      >
      <!-- <v-tab class="app-tab" v-if="userStore.accessToken" :to="{ name: 'user-mypage' }"
        >마이페이지</v-tab
      > -->
      <v-tab
        class="app-tab"
        v-if="userStore.accessToken"
        @click.prevent="userStore.logout"
        :to="{ name: 'user-login' }"
        >로그아웃</v-tab
      >
    </v-tabs>
  </v-app-bar>
</template>

<style scoped>
.all-app {
  padding: 0;
  margin: 0;
}

.app-bar {
  display: flex;
  align-items: center;
  background-color: rgb(255, 255, 255, 1);
  font-family: NeoDunggeunmoPro;
}

.app-bar-tab {
  display: flex;
}

.app-tab {
  font-size: 1.2rem;
}
</style>
