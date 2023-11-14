<script setup lang="ts">
import { ref } from 'vue'

const tab = ref(null)
</script>

<template>
  <v-app class="all-app">
    <v-app-bar class="app-bar">
      <v-tabs v-model="tab" background-color="primary" class="app-bar-tab">
        <router-link :to="{ name: 'home' }" class="routerLink">
          <v-tab class="app-tab">newjibs</v-tab>
        </router-link>
        <v-tab class="app-tab" :to="{ name: 'maps' }">지도</v-tab>
        <router-link :to="{ name: 'notices' }" class="routerLink">
          <v-tab class="app-tab">공지사항</v-tab>
        </router-link>
        <v-tab class="app-tab" :to="{ name: 'news' }">뉴스</v-tab>

        <v-spacer />

        
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
