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

<style scoped lang="scss"></style>
