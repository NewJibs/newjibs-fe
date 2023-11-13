<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavBar from './components/common/TheNavBar.vue'
</script>

<template>
  <header>
    <TheNavBar />
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
.root {
  $red-color: red;
  $blue-color: blue;
  h1 {
    color: $red-color;
  }
  h2 {
    color: $blue-color;
  }
}
</style>
