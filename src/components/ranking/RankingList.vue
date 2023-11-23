<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { instance } from '@/util/http-common'
import { useHomeStore } from '@/stores/home-store'
import TheLoading from '../common/TheLoading.vue'

let data = reactive({})
const dialog = ref(true) //결과 모달창
const homeStore = useHomeStore() //pinia store 사용
let aptNos = ref([])
// let finalData = reactive(null)
let finalData = {
  sumPriceGap: 47500,
  sumPercentageGap: 4.75,
  results: [
    {
      priceChange: {
        beforeDealAmount: 66000,
        beforeDealYear: 2020,
        beforeDealMonth: 2,
        beforeDealDay: 23,
        afterDealAmount: 92000,
        afterDealYear: 2022,
        afterDealMonth: 4,
        afterDealDay: 11,
        priceGap: 26000,
        percentageGap: 39.39
      },
      houseInfo: {
        aptCode: 11110000000018,
        no: 111102002000038,
        area: '59.9426',
        sidoName: '서울특별시',
        gugunName: '종로구',
        dongName: '숭인동',
        buildYear: 2009,
        roadName: '숭인동길',
        roadNameBonBun: '00021',
        roadNameBubun: '00000',
        roadNameSeq: '01',
        roadNameBasementCode: '0',
        roadNameCode: '4100204',
        dong: '숭인동',
        bonbun: '0766',
        bubun: '0000',
        sigunguCode: '11110',
        eubmyundongCode: '17500',
        landCode: '1',
        apartmentName: '종로청계힐스테이트',
        jibun: '766',
        lng: '127.020959405051',
        lat: '37.5757847596495'
      }
    },
    {
      priceChange: {
        beforeDealAmount: 100000,
        beforeDealYear: 2020,
        beforeDealMonth: 1,
        beforeDealDay: 13,
        afterDealAmount: 121500,
        afterDealYear: 2022,
        afterDealMonth: 4,
        afterDealDay: 13,
        priceGap: 21500,
        percentageGap: 21.5
      },
      houseInfo: {
        aptCode: 11110000000018,
        no: 111102001000044,
        area: '114.7153',
        sidoName: '서울특별시',
        gugunName: '종로구',
        dongName: '숭인동',
        buildYear: 2009,
        roadName: '숭인동길',
        roadNameBonBun: '00021',
        roadNameBubun: '00000',
        roadNameSeq: '01',
        roadNameBasementCode: '0',
        roadNameCode: '4100204',
        dong: '숭인동',
        bonbun: '0766',
        bubun: '0000',
        sigunguCode: '11110',
        eubmyundongCode: '17500',
        landCode: '1',
        apartmentName: '종로청계힐스테이트',
        jibun: '766',
        lng: '127.020959405051',
        lat: '37.5757847596495'
      }
    }
  ]
}

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

onMounted(async () => {
  // finalData.value = await homeStore.resultData
  fetchRanking()
  console.log(finalData.value)
})
</script>

<template>
  <div class="all_wrap">
    <!-- 모달창 -->
    <v-dialog v-model="dialog" width="800" transition="dialog-expand-transition">
      <v-card style="display: flex; font-family: 'NeoDunggeunmoPro'; border-radius: 2rem;">
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
        <div style="display: flex; justify-content: space-around; margin-top: 2.5rem">
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
            <div>{{ formatPrice(finalData.sumPriceGap) }}</div>
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
            <div>{{ finalData.sumPercentageGap }}%</div>
            <!-- <div v-else><TheLoading /></div> -->
          </div>
        </div>

        <v-divider></v-divider>

        <div class="container">
          <v-list lines="three">
            <v-list-item v-for="result in finalData?.results" :key="result.houseInfo.no">
              <v-list-item-content
                style="
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                  line-height: normal;
                "
              >
                <div style="display: flex; flex-direction: column">
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
