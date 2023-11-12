<template>
  <v-app ref="app">
    <v-app-bar>
      <v-tabs v-model="tab" background-color="primary">
        <router-link :to="{ name: 'home' }" class="routerLink">
          <v-tab>newjibs</v-tab>
        </router-link>
        <v-tab to="/map">지도</v-tab>
        <router-link :to="{ name: 'notices' }" class="routerLink">
          <v-tab>공지사항</v-tab>
        </router-link>
        <v-tab to="/news">뉴스</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer>
      <!-- Your footer content goes here -->
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tab = ref(null)
</script>

<style>
.routerLink {
  color: black;
}
</style>
