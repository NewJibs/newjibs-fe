<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavBar from './components/common/TheNavBar.vue'
</script>

<template>
  <header class="navbar">
    <TheNavBar />
  </header>
  <div class="v-main">
    <RouterView />
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.navbar {
  height: 3.9rem;
}

.v-main {
  /* height: calc(100vh - 3.9rem); */
  /* overflow: auto; */
}

@font-face {
  font-family: 'NeoDunggeunmoPro';
  src: url('@/fonts/NeoDunggeunmoPro-Regular.ttf') format('truetype');
  src: url('@/fonts/NeoDunggeunmoPro-Regular.woff') format('woff');
}
</style>
