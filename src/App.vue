<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavBar from './components/common/TheNavBar.vue';
</script>

<template>
  <header></header>
  <TheNavBar />
  <RouterView />
  <a-button type="primary">Primary Button</a-button>
</template>

<style scoped></style>
