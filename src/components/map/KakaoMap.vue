<script setup>
import { ref, watch, onMounted } from 'vue'
import { instance } from '@/util/http-common'
import markerImageSrc from '@/assets/home-img/home.png'
import selectedHomeImageSrc from '@/assets/home-img/selected.png'
import { registerRuntimeHelpers } from '@vue/compiler-core'

let placeOverlay,
  contentNode,
  markers = []
let currCategory = ''
let mapContainer, mapOption, map, clusterer, roadviewContainer, roadview, roadviewClient
const ps = ref()
const infowindow = ref()
const keyword = ref('') //키워드 검색

//좌측 컴포넌트 열기
const drawer = ref(false)

//axios
const isLoading = ref(false) //로딩 상태 관리하는 속성
const aptDetailData = ref() //클릭된 아파트 정보

//선택된 아파트 배열
let selectedApt = ref([])

onMounted(async () => {
  if (window.kakao && window.kakao.maps) {
    await initMap()
    markAllApt()
  } else {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`

    script.onload = () => kakao.maps.load(() => initMap())
    document.head.appendChild(script)
  }
})

const initMap = () => {
  mapContainer = document.getElementById('map')
  mapOption = {
    center: new kakao.maps.LatLng(37.5642135, 127.0016985),
    level: 8,
    minLevel: 2,
    maxLevel: 10
  }
  map = new kakao.maps.Map(mapContainer, mapOption)
  ps.value = new kakao.maps.services.Places(map)
  infowindow.value = new kakao.maps.InfoWindow({ zIndex: 1 })

  contentNode = document.createElement('div')
  contentNode.className = 'placeinfo_wrap'

  placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1, content: contentNode })

  clusterer = new kakao.maps.MarkerClusterer({
    map: map, //마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 6, // 클러스터 할 최소 지도 레벨
    disableClickZoom: true, //// 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
    gridSize: 90
  })

  kakao.maps.event.addListener(map, 'idle', searchPlaces)

  //각 카테고리에 클릭 이벤트 등록
  addCategoryClickEvent()
}

//=====================================
//axios
//지도에 뿌려줄 아파트 정보 받아오기
const markAllApt = () => {
  isLoading.value = true //데이터 불러올때
  instance
    .get('/houses/coordinates')
    .then((res) => {
      const aptAllData = res.data
      isLoading.value = false
      markAptMarker(aptAllData)
    })
    .catch((res) => {
      console.error(res)
      isLoading.value = false
    })
}

//아파트 마커 생성하고 지도 위에 마커를 표시하는 함수 - markApt : []
const markAptMarker = (markApt) => {
  const imageSrc = markerImageSrc
  const imageSize = new kakao.maps.Size(40, 40) //마커 이미지의 크기

  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

  markApt.forEach((value) => {
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(value.lat, value.lng), //
      image: markerImage
    })

    //마커에 aptCode 저장
    marker.aptCode = value.aptCode

    //마커에 클릭 이벤트 리스너 추가
    kakao.maps.event.addListener(marker, 'click', () => {
      markAptDetail(value.aptCode) //클릭된 마커의 aptCode로 markAptDetail 함수 호출
    })

    markers.push(marker) //배열에 생성된 마커 추가
    // marker.setMap(map) //지도 위에 마커 표시
  })

  // console.log(map.getLevel())
  //then이 안먹는거 같음
  // if (map.getLevel() <= 8) {
  clusterer.addMarkers(markers)
  addClustererClickEvent()
  // }
}

//마커 클러스터러에 클릭이벤트 등록
const addClustererClickEvent = () => {
  kakao.maps.event.addListener(clusterer, 'clusterclick', (cluster) => {
    //현재 지도 레벨에서 1레벨 확대한 레벨
    let level = map.getLevel() - 1

    //클러스터의 중심 좌표를 얻어오기
    const clusterCenter = cluster.getCenter()

    //클러스터의 중심으로 지도를 부드럽게 이동
    map.panTo(clusterCenter)

    //일정 지연 시간 후에 확대
    setTimeout(() => {
      // 지도로 클릭된 클러스터의 마커의 위치를 기준으로 확대
      map.setLevel(level, { anchor: clusterCenter })
    }, 500) // 지연 시간을 500ms로 설정
  })
}

//==============================
//엘리먼트에 이벤트 핸들러 등록하는 함수
const addEventHandle = (target, type, callback) => {
  if (target.addEventListener) {
    target.addEventListener(type, callback)
  } else {
    target.attachEvent('on' + type, callback)
  }
}

//카테고리 검색을 요청하는 함수
const searchPlaces = () => {
  if (!currCategory) {
    return
  }

  //커스텀 오버레이 숨기기
  placeOverlay.setMap(null)
  //지도에 표시되는 마커 지우기
  removeMarker()

  ps.value.categorySearch(currCategory, placesSearchCB, { useMapBounds: true })
}

//장소 검색이 완료됐을 때 호출되는 콜백함수
const placesSearchCB = (data, status, pagination) => {
  if (status === kakao.maps.services.Status.OK) {
    //정상적으로 검색이 완료되었으면 지도에 마커 표시
    displayPlaces(data)
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
  } else if (status === kakao.maps.services.Status.ERROR) {
    // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
  }
}

//지도에 마커를 표시하는 함수
const displayPlaces = (places) => {
  //몇번째 카테고리가 선택되어 있는지 얻어옴
  //스프라이트 이미지 위치를 계산하는데 사용
  const order = document.getElementById(currCategory)?.dataset.order

  for (let i = 0; i < places.length; i++) {
    //마커 생성하고 지도에 표시
    const marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order)

    //마커와 검색결과 항목을 클릭했을 때
    //장소정보를 표출하도록 클릭 이벤트 등록
    ;(function (marker, place) {
      kakao.maps.event.addListener(marker, 'click', function () {
        displayPlaceInfo(place)
      })
    })(marker, places[i])
  }
}

//마커 생성하고 지도 위에 마커를 표시하는 함수
const addMarker = (position, order) => {
  const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png'
  const imageSize = new kakao.maps.Size(40, 36.5) //마커 이미지의 크기
  const imgOptions = {
    spriteSize: new kakao.maps.Size(72, 208), //스프라이트 이미지의 크기
    spriteOrigin: new kakao.maps.Point(44, order * 34), //스프라이트 이미지 중 사용할 영역의 좌상단 좌표
    offset: new kakao.maps.Point(11, 28) //마커 좌표에 일치시킬 이미지 내에서의 좌표
  }
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions)
  const marker = new kakao.maps.Marker({
    position: position, //마커의 위치
    image: markerImage
  })

  marker.setMap(map) //지도 위에 마커 표시
  markers.push(marker) //배열에 생성된 마커 추가

  return marker
}

//지도 위에 표시되고 있는 마커 모두 제거
const removeMarker = () => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null)
  }
  markers = []
}

//클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수
const displayPlaceInfo = (place) => {
  let content =
    '<div class="placeinfo">' +
    '   <a class="title" href="' +
    place.place_url +
    '" target="_blank" title="' +
    place.place_name +
    '">' +
    place.place_name +
    '</a>'

  if (place.road_address_name) {
    content +=
      '    <span title="' +
      place.road_address_name +
      '">' +
      place.road_address_name +
      '</span>' +
      '  <span class="jibun" title="' +
      place.address_name +
      '">(지번 : ' +
      place.address_name +
      ')</span>'
  } else {
    content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>'
  }

  content +=
    '    <span class="tel">' + place.phone + '</span>' + '</div>' + '<div class="after"></div>'

  contentNode.innerHTML = content
  placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x))
  placeOverlay.setMap(map)
}

//각 카테고리에 클릭 이벤트 등록
const addCategoryClickEvent = () => {
  const category = document.getElementById('category')
  const children = category.children

  for (let i = 0; i < children.length; i++) {
    children[i].onclick = onClickCategory
  }
}

//카테고리를 클릭했을 때 호출되는 함수
const onClickCategory = (e) => {
  const id = e.currentTarget.id
  const className = e.currentTarget.className

  placeOverlay.setMap(null)

  if (className === 'on') {
    currCategory = ''
    changeCategoryClass()
    removeMarker()
  } else {
    currCategory = id
    changeCategoryClass(e.currentTarget)
    searchPlaces()
  }
}

//클릭된 카테고리에만 클릭된 스타일을 적용하는 함수
const changeCategoryClass = (el) => {
  const category = document.getElementById('category')
  const children = category.children

  for (let i = 0; i < children.length; i++) {
    children[i].className = ''
  }

  if (el) {
    el.className = 'on'
  }
}

//키워드로 검색하기
const searchKeyword = (e) => {
  e.preventDefault()
  ps.value.keywordSearch(keyword.value, keywordPlacesSearchCB)
}

//키워드 검색 완료 시 호출되는 콜백함수
const keywordPlacesSearchCB = (data, status, pagination) => {
  if (status === kakao.maps.services.Status.OK) {
    //검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
    //LatLngBounds 객체에 좌표 추가
    let bounds = new kakao.maps.LatLngBounds()

    console.log('data') //배열
    for (let i = 0; i < data.length; i++) {
      displayMarker(data[i]) //data[i]는 객체로 옴
      console.log(data[i])
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
    }

    //검색된 장소 위치를 기준으로 지도 범위 재설정
    map.setBounds(bounds)
  }
}

//키워드 지도에 마커를 표시하는 함수
const displayMarker = (place) => {
  //마커를 생성하고 지도에 표시
  const marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x)
  })

  //마커에 클릭이벤트를 등록
  kakao.maps.event.addListener(marker, 'click', () => {
    //마커를 클릭하면 장소명이 인포윈도우에 표출
    let content = '<div class="keywordInfo">' + place.place_name + '</div>'

    infowindow.value.setContent(content)
    infowindow.value.open(map, marker)
  })
}

//로드뷰 초기화하는 함수
const initRoadview = (lat, lng) => {
  roadviewContainer = document.getElementById('roadView') // 로드뷰를 표시할 div
  roadview = new kakao.maps.Roadview(roadviewContainer) // 로드뷰 객체
  roadviewClient = new kakao.maps.RoadviewClient() // 좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper 객체

  let position = new kakao.maps.LatLng(lat, lng)

  // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
  roadviewClient.getNearestPanoId(position, 50, (panoId) => {
    roadview.setPanoId(panoId, position) //panoId와 중심좌표를 통해 로드뷰 실행
  })
}

//============================
//매물 사는 것과 관련된 함수
//거래가격 format 함수
const formatPrice = (price) => {
  return (price / 10000).toFixed(2) + '억'
}

//loading을 한번에 줄지 생각
//요청한 아파트 정보에 대한 상세정보 받아오기
const markAptDetail = async (aptCode) => {
  await instance
    .get(`/houses/${aptCode}`)
    .then((res) => {
      aptDetailData.value = res.data
      if (aptDetailData.value && aptDetailData.value.length > 0) {
        // 로드뷰 초기화
        initRoadview(aptDetailData.value[0].lat, aptDetailData.value[0].lng)
      }
    })
    .catch((res) => {
      console.error(res)
    })
}

//선택된 리스트에 아파트 정보 넣기
const addSelectedApt = (no, aptCode) => {
  if (selectedApt.value.includes(no)) {
    alert('이미 선택된 아파트입니다.')
    return
  }

  console.log(no)
  selectedApt.value.push(no) //구매한 매물

  for (let i = 0; i < selectedApt.value.length; i++) {
    console.log('배열' + selectedApt.value[i])
  }
  //선택된 아파트의 마커 이미지 바꾸기
  changeMarkerImg(aptCode, selectedHomeImageSrc)
}

//매물 선택 삭제
const removeSelectedApt = (no) => {
  selectedApt.value = selectedApt.value.filter((item) => item !== no)
}

//선택된 아파트의 마커 이미지 바꾸는 함수
const changeMarkerImg = (aptCode, newImgSrc) => {
  //markers 배열 순회하면서 해당 aptCode를 가진 마커 찾기
  markers.forEach((marker) => {
    if (marker.aptCode === aptCode) {
      //찾은 마커의 이미지를 새 이미지로 바꾼다.
      const markerImg = new kakao.maps.MarkerImage(newImgSrc, new kakao.maps.Size(40, 40))
      marker.setImage(markerImg)
    }
  })
}
</script>

<template>
  <div style="position: relative">
    <div style="position: absolute; z-index: 10; height: 100%">
      <v-card>
        <v-layout>
          <v-navigation-drawer v-model="drawer" width="400" temporary style="top: 3.8rem">
            <div id="roadView" style="width: 400px; height: 200px"></div>
            <v-list lines="two" v-for="apt in aptDetailData">
              <v-list-item
                v-if="apt"
                :prepend-avatar="markerImageSrc"
                :title="`${apt.apartmentName}아파트`"
                :subtitle="`${apt.sidoName} ${apt.gugunName} ${apt.dongName} ${apt.jibun}`"
              >
                <div style="display: flex; margin-bottom: 0.7rem">
                  <div style="display: flex; flex-direction: column">
                    <div style="margin-top: 0.7rem">면적(m^2) : {{ apt.area }}</div>
                    <div>건축년도 : {{ apt.buildYear }}</div>
                    <div>
                      거래일시 : {{ apt.dealYear }} / {{ apt.dealMonth }} / {{ apt.dealDay }}
                    </div>
                    <div>매물번호 : {{ apt.no }}</div>
                  </div>
                  <div style="display: flex; align-items: center; margin-left: 0.5rem">
                    <h3 style="margin-top: 0.7rem; color: #5995fd">
                      {{ formatPrice(apt.dealAmount) }}
                    </h3>
                  </div>
                </div>
                <v-btn
                  variant="tonal"
                  color="#5995fd"
                  @click.prevent="addSelectedApt(apt.no, apt.aptCode)"
                  >구매</v-btn
                >
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
            >
              <v-list-item :prepend-avatar="selectedHomeImageSrc"
                ><h3>부동산 거래 내역</h3></v-list-item
              >
              <v-list v-for="selected in selectedApt" :key="selected" style="z-index: 10">
                <v-list-item
                  >{{ selected }}
                  <font-awesome-icon
                    class="icon"
                    icon="xmark"
                    @click="removeSelectedApt(selected)"
                  ></font-awesome-icon>
                </v-list-item>
              </v-list>
            </div>
          </v-navigation-drawer>
        </v-layout>
      </v-card>
      <v-btn
        style="
          position: absolute;
          top: 40%;
          border-radius: 0 50% 50% 0;
          width: 20px;
          height: 50px;
          transition: right 0.8s ease-in-out;
        "
        v-if="!drawer"
        color="primary"
        @click.stop="drawer = !drawer"
      >
        &gt;
      </v-btn>
      <v-btn
        style="
          position: absolute;
          left: 399px;
          top: 40%;
          border-radius: 0 50% 50% 0;
          width: 20px;
          height: 50px;
          transition: left 0.8s ease-in-out;
        "
        v-else
        color="primary"
        @click.stop="drawer = !drawer"
      >
        &lt;
      </v-btn>
    </div>

    <!-- 기본 map 컴포넌트 -->
    <div class="map_wrap">
      <div id="map"></div>
      <div id="option_wrap">
        <div class="option">
          <form>
            키워드 :
            <input
              type="text"
              v-model="keyword"
              placeholder="검색어를 입력하세요"
              id="keyword"
              size="18"
            />
            <button type="submit" @click="searchKeyword">검색</button>
          </form>
        </div>
      </div>
      <ul id="category">
        <li id="BK9" data-order="0">
          <span class="category_bg bank"></span>
          은행
        </li>
        <li id="MT1" data-order="1">
          <span class="category_bg mart"></span>
          마트
        </li>
        <li id="PM9" data-order="2">
          <span class="category_bg pharmacy"></span>
          약국
        </li>
        <li id="OL7" data-order="3">
          <span class="category_bg oil"></span>
          주유소
        </li>
        <li id="CE7" data-order="4">
          <span class="category_bg cafe"></span>
          카페
        </li>
        <li id="CS2" data-order="5">
          <span class="category_bg store"></span>
          편의점
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.keywordInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9rem;
  height: 2rem;
  font-size: 3rem;
  border: none;
}

#map {
  width: 100%;
  height: 100vh;
}
.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
  font-size: 12px;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 350px;
}
/* id=category 부분 */
#category {
  position: absolute;
  top: 15px;
  right: 30px;
  border-radius: 10px;
  border: 0.5px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
}
/* 검색어 부분 */
#option_wrap {
  position: absolute;
  top: 25px;
  right: 350px; /* category의 너비에 따라 조정 */
  border-radius: 10px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  padding: 10px;
  z-index: 2;
}
#category li {
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
#category li .category_bg {
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png)
    no-repeat;
}
#category li .bank {
  background-position: -10px 0;
}
#category li .mart {
  background-position: -10px -36px;
}
#category li .pharmacy {
  background-position: -10px -72px;
}
#category li .oil {
  background-position: -10px -108px;
}
#category li .cafe {
  background-position: -10px -144px;
}
#category li .store {
  background-position: -10px -180px;
}
#category li.on .category_bg {
  background-position-x: -46px;
}
.placeinfo_wrap {
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 300px;
}
.placeinfo {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  background: #fff;
}
.placeinfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.placeinfo_wrap .after {
  content: '';
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
}
.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
  color: #fff;
  text-decoration: none;
}
.placeinfo a,
.placeinfo span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.placeinfo span {
  margin: 5px 5px 0 5px;
  cursor: default;
  font-size: 13px;
}
.placeinfo .title {
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: #d95050;
  background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
}
.placeinfo .tel {
  color: #0f7833;
}
.placeinfo .jibun {
  color: #999;
  font-size: 11px;
  margin-top: 0;
}
</style>
