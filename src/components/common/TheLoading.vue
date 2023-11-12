<script setup lang="ts"></script>

<template>
  <main>
    <div class="loading">
      <img class="loading-img" src="@/assets/loading.png" />
    </div>
  </main>
</template>

<style scoped>
.loading {
  /* 배경을 불투명하게 설정 */
  background: rgba(255, 255, 255, 0.8);
  /* 중앙에 위치시키기 위한 설정 */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-img {
  /* 이미지를 시계방향으로 돌리는 애니메이션 적용 */
  animation: spin 3s linear infinite;
}

/* 시계방향으로 돌리는 애니메이션 정의 */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
