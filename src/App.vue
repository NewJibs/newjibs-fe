<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavBar from './components/common/TheNavBar.vue'
</script>

<template>
  <v-layout>
    <div class="v-main">
      <header class="navbar">
        <TheNavBar />
      </header>
      <RouterView />
    </div>
  </v-layout>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.navbar {
  /* position: sticky; */
  height: 3.9rem;
}

@font-face {
  font-family: 'NeoDunggeunmoPro';
  src: url('@/fonts/NeoDunggeunmoPro-Regular.ttf') format('truetype');
  src: url('@/fonts/NeoDunggeunmoPro-Regular.woff') format('woff');
}
</style>
