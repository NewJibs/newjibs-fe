<script setup>
import { ref, onMounted, reactive, watchEffect } from 'vue'
import { instance } from '@/util/http-common'
import { useHomeStore } from '@/stores/home-store'

let data = reactive({})
const dialog = ref(true) //결과 모달창
const homeStore = useHomeStore() //pinia store 사용
let finalData = reactive({
  //초기값 세팅 잘하기
  sumPriceGap: 0,
  sumPercentageGap: 0,
  results: []
})

//랭킹정보 가져오기
const fetchRanking = async () => {
  await instance.get('/members/ranks').then((res) => {
    Object.assign(data, res.data)
  })
}

//숫자 포맷팅 함수
const formatPrice = (price) => {
  return (price / 10000).toFixed(2) + '억'
}

watchEffect(() => {
  finalData.value = homeStore.resultData
  console.log(finalData.value)
})

//postSelectedAptNo가 비동기 처리되고 있기 때문에 resultData의 값이 아직 설정되지 않은 상태여서 null이 반환
//watchEffect로 homeStore.resultData값을 감시하고, 값이 변경되면 할당
onMounted(() => {
  fetchRanking()
})
</script>

<template>
  <div class="all_wrap">
    <!-- 모달창 -->
    <v-dialog v-model="dialog" width="800" transition="dialog-expand-transition">
      <v-card style="display: flex; font-family: 'NeoDunggeunmoPro'; border-radius: 2rem">
        <v-row>
          <v-col cols="11">
            <h1
              style="
                font-size: 3rem;
                font-family: 'NeoDunggeunmoPro';
                color: #5995fd;
                text-align: center;
                margin-top: 2rem;
                margin-left: 2rem;
              "
            >
              부동산 거래 결과
            </h1>
            <v-list lines="two">
              <!-- ... -->
            </v-list>
          </v-col>
          <v-col cols="1">
            <v-btn icon width="25" height="25" variant="text" style="align-self: flex-start">
              <font-awesome-icon
                style="margin-left: 0.5rem; margin-top: 0.5rem"
                icon="xmark"
                @click="dialog = false"
              ></font-awesome-icon>
            </v-btn>
          </v-col>
        </v-row>
        <!-- 총 수익 -->
        <div style="display: flex; justify-content:flex-start; margin-top: 2.5rem">
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-size: 3rem;
              margin-right: -10rem;
            "
          >
            <h3 style="color: gray">총 투자수익금</h3>
            <div>{{ formatPrice(finalData.value.sumPriceGap) }}</div>
            <!-- <div v-else><TheLoading /></div> -->
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-size: 3rem;
            "
          >
            <h3 style="color: gray">총 투자수익률</h3>
            <div>{{ finalData.value.sumPercentageGap }}%</div>
            <!-- <div v-else><TheLoading /></div> -->
          </div>
        </div>

        <v-divider></v-divider>

        <div class="container">
          <v-list lines="three">
            <v-list-item v-for="result in finalData.value.results" :key="result.houseInfo.no">
              <v-list-item-content
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  line-height: normal;
                "
              >
                <div style="display: flex; flex-direction: column;">
                  <v-list-item-title style="font-size: 1.2rem">
                    {{ result.houseInfo.apartmentName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ result.houseInfo.sidoName }} {{ result.houseInfo.dongName }}
                    {{ result.houseInfo.jibun }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{ result.houseInfo.no }}
                    <!-- beforeDealAmount: {{ result.priceChange.beforeDealAmount }} -->
                  </v-list-item-subtitle>
                </div>
                <div style="display: flex">
                  <div style="display: flex; flex-direction: column; align-items: center">
                    <div style="font-size: 1.6rem">
                      {{ formatPrice(result.priceChange.beforeDealAmount) }}
                    </div>
                    <div style="font-weight: 100; color: gray">
                      {{ result.priceChange.beforeDealYear }}-{{
                        result.priceChange.beforeDealMonth
                      }}-{{ result.priceChange.afterDealDay }}
                    </div>
                  </div>
                  <div style="font-size: 1rem">
                    <font-awesome-icon
                      style="margin: 1rem 0.5rem"
                      icon="arrow-right"
                    ></font-awesome-icon>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center">
                    <div style="font-size: 1.6rem">
                      {{ formatPrice(result.priceChange.afterDealAmount) }}
                    </div>
                    <div style="font-weight: 100; color: gray">
                      {{ result.priceChange.afterDealYear }}-{{
                        result.priceChange.afterDealMonth
                      }}-{{ result.priceChange.afterDealDay }}
                    </div>
                  </div>
                </div>

                <div style="display: flex; font-size: 2.6rem; color: #5995fd">
                  <div>{{ result.priceChange.percentageGap }}%</div>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </v-card>
    </v-dialog>

    <div class="board_wrap">
      <div style="display: flex; align-items: center; justify-content: center">
        <h1 style="font-size: 4rem; color: yellow; margin-right: 1rem">Ranking</h1>
        <v-btn
          color="primary"
          style="font-size: 1.3rem"
          width="150"
          height="40"
          @click="dialog = true"
          >결과 보기</v-btn
        >
      </div>
      <v-list lines="three">
        <v-list-item v-for="(user, rank) in data" :key="rank">
          <v-list-item-content>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
              "
            >
              <div style="display: flex; flex-direction: column">
                <v-list-item-title style="font-size: 1.5rem">
                  {{ rank }}. {{ user.email }}
                </v-list-item-title>
                <v-list-item-subtitle style="margin-left: 1.5rem">
                  이름: {{ user.name }}
                </v-list-item-subtitle>
              </div>
              <div style="margin-left: 1.5rem; font-size: 2rem; color: #5995fd">
                {{ formatPrice(user.point) }}
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<style scoped>
.all_wrap {
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 3.9rem);
  background-image: url('@/assets/ranking-back.png');
  background-size: cover;
  font-family: 'NeoDunggeunmoPro';
}

.board_wrap {
  width: 48rem;
  height: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  border-radius: 3rem;
  background-color: rgba(10, 15, 32, 0.1);
}
</style>
