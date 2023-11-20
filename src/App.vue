<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavBar from './components/common/TheNavBar.vue'
</script>

<template>
  <header style="height: 4rem">
    <TheNavBar />
  </header>
  
  <RouterView />
</template>

<style lang="scss">
@font-face {
  font-family: 'NeoDunggeunmoPro';
  src: url('@/fonts/NeoDunggeunmoPro-Regular.ttf') format('truetype');
  src: url('@/fonts/NeoDunggeunmoPro-Regular.woff') format('woff');

}
</style>
