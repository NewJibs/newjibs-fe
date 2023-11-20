<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavBar from './components/common/TheNavBar.vue'
</script>

<template>
  <header class="navbar">
    <TheNavBar />
  </header>

  <RouterView />
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.navbar {
  height: 4rem;
}

@font-face {
  font-family: 'NeoDunggeunmoPro';
  src: url('@/fonts/NeoDunggeunmoPro-Regular.ttf') format('truetype');
  src: url('@/fonts/NeoDunggeunmoPro-Regular.woff') format('woff');
}
</style>
