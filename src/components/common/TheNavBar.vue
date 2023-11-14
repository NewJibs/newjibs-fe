<script setup lang="ts">
import { ref } from 'vue'

const tab = ref(null)
</script>

<template>
  <v-app class="all-app">
    <v-app-bar class="app-bar">
      <v-tabs background-color="primary" slider-color="yellow" class="app-bar-tab">
        <v-tab class="app-tab" :to="{ name: 'home' }">newjibs</v-tab>
        <v-tab class="app-tab" :to="{ name: 'maps' }">지도</v-tab>
        <v-tab class="app-tab" :to="{ name: 'notices' }">공지사항</v-tab>
        <v-tab class="app-tab" :to="{ name: 'news' }">뉴스</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-tabs background-color="primary" slider-color="yellow" class="app-bar-tab">
        <v-tab class="app-tab" :to="{ name: 'user-signup' }">회원가입</v-tab>
        <v-tab class="app-tab" :to="{ name: 'user-login' }">로그인</v-tab>
      </v-tabs>
    </v-app-bar>
  </v-app>
</template>

<style scoped>
.routerLink {
  color: black;
}

.all-app {
  padding: 0;
  margin: 0;
}

.app-bar {
  /* height: 9vh; */
  display: flex;
  align-items: center;
}

.app-bar-tab {
  display: flex;
}

.app-tab {
  font-size: 1.3rem;
}
</style>
