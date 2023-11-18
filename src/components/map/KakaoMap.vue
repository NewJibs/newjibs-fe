<script setup>
import { ref, watch, onMounted } from 'vue'

let map
const positions = ref([])
const markers = ref([])
const ps = ref()

// const props = defineProps({ stations: Array, selectStation: Object })

//이렇게 map import 해오는거다 강조!
onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap()
  } else {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      //autoload=false 꼭 해주기
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`
    // global kakao 지우지 말기 - 카카오는 전역변수라고 eslint한테 알려주는 것
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap())
    document.head.appendChild(script)
  }
})

//초기 카카오맵의 위치
const initMap = () => {
  ps.value = new kakao.maps.services.Places(map)

  const container = document.getElementById('map')
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3 //확대 3레벨
  }
  map = new kakao.maps.Map(container, options)

  // loadMarkers();
}

const loadMarkers = () => {
  // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
  deleteMarkers()

  // 마커 이미지를 생성합니다
  //   const imgSrc = require("@/assets/map/markerStar.png");
  // 마커 이미지의 이미지 크기 입니다
  //   const imgSize = new kakao.maps.Size(24, 35);
  //   const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

  // 마커를 생성합니다
  markers.value = []
  positions.value.forEach((position) => {
    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      // image: markerImage, // 마커의 이미지
    })
    markers.value.push(marker)
  })

  // 4. 지도를 이동시켜주기
  // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
  // 마커가 다 보이도록 지도의 확대레벨 자동 세팅
  const bounds = positions.value.reduce(
    (bounds, position) => bounds.extend(position.latlng),
    new kakao.maps.LatLngBounds()
  )

  map.setBounds(bounds)
}

//배열읰 크기가 0보다 크면 배열을 지워라
const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null))
  }
}

``
const changeSelector = (e) => {
  console.log(ps.value)
  ps.value.categorySearch(e.target.value, console.log, { useMapBounds: true })
}
</script>

<template>
  <div class="map_wrap">
    <div id="map"></div>
    <div style="position: absolute; z-index: 9999999; top: 64px">
      <select id="category" @change="changeSelector">
        <option id="MT1" value="MT1" data-order="0">
          <span>대형마트</span>
        </option>
        <option id="CS2" value="편의점" data-order="1">
          <span>편의점</span>
        </option>
        <option id="PS3" value="유치원" data-order="2">
          <span>유치원</span>
        </option>
        <option id="SC4" value="학교" data-order="3">
          <span>학교</span>
        </option>
        <option id="CT1" value="문화시설" data-order="4">
          <span>문화시설</span>
        </option>
        <option id="HP8" value="병원" data-order="5">
          <span>대형마트</span>
        </option>
        <option id="FD6" value="음식점" data-order="6">
          <span>음식점</span>
        </option>
        <option id="CE7" value="카페" data-order="7">
          <span>카페</span>
        </option>
      </select>
    </div>
  </div>
</template>

<!-- 카카오맵은 전역으로 설치되어 있기 때문에 scoped말고 그냥 style -->
<style>
#map {
  width: 100%;
  height: 96vh;
}
</style>
