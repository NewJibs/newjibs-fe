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

<style scoped lang="scss"></style>
