<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const gotoNotice = () => {
  router.push({ name: 'notices' })
}

const gotoRanking = () => {
  router.push({ name: 'ranking' })
}

const gotoMap = () => {
  router.push({ name: 'maps' })
}
</script>

<template>
  <div class="all_wrap" style="font-family: 'NeoDunggeunmoPro'">
    <div class="sliding-image-container">
      <div class="sliding-image">
        <img src="@/assets/home-img/Background.png" alt="Background Image 1" />
        <img src="@/assets/home-img/Background.png" alt="Background Image 2" />
        <img src="@/assets/home-img/Background.png" alt="Background Image 3" />
        <!-- 세 번째 이미지 추가 -->
      </div>
      <img class="character a" src="@/assets/home-img/character/a.png" alt="Character A" />
      <img class="character b" src="@/assets/home-img/character/b.png" alt="Character B" />
      <img class="character c" src="@/assets/home-img/character/c.png" alt="Character C" />
      <img class="character d" src="@/assets/home-img/character/d.png" alt="Character D" />
      <img class="character e" src="@/assets/home-img/character/e.png" alt="Character E" />
    </div>
    <div class="overlay">
      <h1 style="color: yellow">NewJibs</h1>
      <h3>최고의 시세차익을 내세요!</h3>
      <div style="display: flex; margin-top: 1rem">
        <v-btn variant="tonal" style="margin-right: 1rem" @click.prevent="gotoNotice"
          >공지사항 보러가기</v-btn
        >
        <v-btn variant="tonal" @click.prevent="gotoRanking">랭킹 보기</v-btn>
      </div>
      <div>
        <v-btn
          stacked
          color="#5995fd"
          variant="outlined"
          style="margin-top: 1.5rem; font-size: 2rem"
          @click.prevent="gotoMap"
        >
          <font-awesome-icon class="icon" icon="bolt"></font-awesome-icon>
          Start</v-btn
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.all_wrap {
  width: 100%;
  height: calc(100vh - 3.9rem);
  background-image: url('@/assets/home-img/Background.png');
  background-size: 100% auto;
  position: relative;
}

@keyframes moveUpDown {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-30px);
  }
}

.sliding-image-container {
  width: 100%;
  height: calc(100vh - 3.9rem);
  overflow: hidden;
  position: relative;
}

.sliding-image {
  display: flex;
  width: calc(100% * 3);
  /* 세 개의 이미지 너비로 설정 */
  height: calc(100vh - 3.9rem);
  animation: slideImage 150s steps(200) infinite;
}

.sliding-image img {
  flex-shrink: 0;
  width: calc(100% / 3);
  /* 각 이미지가 전체 너비의 1/3을 차지 */
  height: auto;
}

@keyframes slideImage {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-33.3333%);
    /* 전체 너비의 1/3만큼 이동 */
  }
}

.character {
  width: 100px;
  height: 100px;
  position: absolute;
  animation: moveUpDown 3s steps(3) infinite;
}

.character.a {
  top: 12rem;
  left: 8rem;
}

.character.b {
  top: 20rem;
  left: 35rem;
}

.character.c {
  top: 22rem;
  left: 19rem;
}

.character.d {
  top: 28rem;
  left: 47rem;
}

.character.e {
  top: 17rem;
  left: 60rem;
}

/* overlay */
.overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 31rem;
  position: absolute;
  right: 5rem;
  bottom: 3rem;
  padding: 1rem;
  background-color: rgba(10, 12, 35, 0.8);
  color: white;
  border-radius: 20px;
}

.overlay h1 {
  margin: 0;
  font-size: 7rem;
}
</style>
