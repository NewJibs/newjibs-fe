<script setup lang="ts"></script>

<template>
  <v-app class="all-app">
    <v-app-bar scroll-behavior="elevate" class="app-bar">
      <v-tabs background-color="primary" slider-color="#5995fd" class="app-bar-tab">
        <v-tab class="app-tab" :to="{ name: 'home' }" style="font-family: 'NeoDunggeunmoPro'"
          >NewJibs</v-tab
        >
        <v-tab class="app-tab" :to="{ name: 'maps' }">지도</v-tab>
        <v-tab class="app-tab" :to="{ name: 'ranking' }">랭킹</v-tab>
        <v-tab class="app-tab" :to="{ name: 'notices' }">공지사항</v-tab>
        <v-tab class="app-tab" :to="{ name: 'news' }">뉴스</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-tabs background-color="primary" slider-color="transparent" class="app-bar-tab">
        <v-tab class="app-tab" :to="{ name: 'user-login' }">회원가입 / 로그인</v-tab>
      </v-tabs>
    </v-app-bar>
  </v-app>
</template>

<style scoped>
.all-app {
  padding: 0;
  margin: 0;
}

.app-bar {
  display: flex;
  align-items: center;
  height: 3.8rem;
  background-color: rgb(255,255,255,0.3);
}

.app-bar-tab {
  display: flex;
}

.app-tab {
  font-size: 1.3rem;
}
</style>
