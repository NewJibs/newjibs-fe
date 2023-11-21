<script setup lang="ts">
import { useUserStore } from '@/stores/user-store'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const userStore = useUserStore()
const router = useRouter()

//로그인 안되었을 시 접근제한
onMounted(() => {
  if (!userStore.accessToken) {
    alert('로그인 후 접근해주세요.')
    router.push({ name: 'user-login' })
  }
})
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
