<script setup lang="ts">
import { useUserStore } from '@/stores/user-store'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
const router = useRouter()
const dialog = ref(false) //모달

//로그인 안되었을 시 접근제한
onMounted(() => {
  if (!userStore.accessToken) {
    dialog.value = true
  }
})

//모달을 닫았을 때 라우팅
const closeDialogAndNavigate = () => {
  dialog.value = false
  router.push({ name: 'user-login' })
}
</script>

<template>
  <div>
    <div>
      <router-view></router-view>
    </div>

    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text> 로그인 후 접근해주세요. </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="closeDialogAndNavigate">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped></style>
