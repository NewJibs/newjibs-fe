<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavBar from './components/common/TheNavBar.vue'
</script>

<template>
  <header></header>
  <TheNavBar />
  <RouterView />
  <div class="root">
    <h1>안녕</h1>
    <h2>dkssud</h2>
  </div>
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
