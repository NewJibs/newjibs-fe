<script setup>
import { ref, watch, onMounted } from 'vue'

let placeOverlay,
  contentNode,
  markers = []
let currCategory = ''
let mapContainer, mapOption, map
const ps = ref()

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap()
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
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 5
  }
  map = new kakao.maps.Map(mapContainer, mapOption)
  ps.value = new kakao.maps.services.Places(map)

  contentNode = document.createElement('div')
  contentNode.className = 'placeinfo_wrap'

  placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1, content: contentNode })

  kakao.maps.event.addListener(map, 'idle', searchPlaces)

  addCategoryClickEvent()
}

const addEventHandle = (target, type, callback) => {
  if (target.addEventListener) {
    target.addEventListener(type, callback)
  } else {
    target.attachEvent('on' + type, callback)
  }
}

const searchPlaces = () => {
  if (!currCategory) {
    return
  }

  placeOverlay.setMap(null)
  removeMarker()

  ps.value.categorySearch(currCategory, placesSearchCB, { useMapBounds: true })
}

const placesSearchCB = (data, status, pagination) => {
  if (status === kakao.maps.services.Status.OK) {
    displayPlaces(data)
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
  } else if (status === kakao.maps.services.Status.ERROR) {
    // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
  }
}

const displayPlaces = (places) => {
  const order = document.getElementById(currCategory).getAttribute('data-order')

  for (let i = 0; i < places.length; i++) {
    const marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order)

    ;(function (marker, place) {
      kakao.maps.event.addListener(marker, 'click', function () {
        displayPlaceInfo(place)
      })
    })(marker, places[i])
  }
}

const addMarker = (position, order) => {
  const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png'
  const imageSize = new kakao.maps.Size(27, 28)
  const imgOptions = {
    spriteSize: new kakao.maps.Size(72, 208),
    spriteOrigin: new kakao.maps.Point(46, order * 36),
    offset: new kakao.maps.Point(11, 28)
  }
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions)
  const marker = new kakao.maps.Marker({
    position: position,
    image: markerImage
  })

  marker.setMap(map)
  markers.push(marker)

  return marker
}

const removeMarker = () => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null)
  }
  markers = []
}

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

const addCategoryClickEvent = () => {
  const category = document.getElementById('category')
  const children = category.children

  for (let i = 0; i < children.length; i++) {
    children[i].onclick = onClickCategory
  }
}

const onClickCategory = () => {
  const id = this.id
  const className = this.className

  placeOverlay.setMap(null)

  if (className === 'on') {
    currCategory = ''
    changeCategoryClass()
    removeMarker()
  } else {
    currCategory = id
    changeCategoryClass(this)
    searchPlaces()
  }
}

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

const changeSelector = (e) => {
  currCategory = e.target.value
  searchPlaces()
}
</script>

<template>
  <div class="map_wrap">
    <div id="map"></div>
    <div class="dropdown" style="position: absolute; z-index: 9999999; top: 4vh">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        주변 시설 선택
      </button>
      <select class="dropdown-menu" id="category" @click="changeSelector">
        <option class="dropdown-item" id="MT1" value="MT1" data-order="0">대형마트</option>
        <option class="dropdown-item" id="CS2" value="CS2" data-order="1">편의점</option>
        <option class="dropdown-item" id="PS3" value="PS3" data-order="2">유치원</option>
        <option class="dropdown-item" id="SC4" value="SC4" data-order="3">학교</option>
        <option class="dropdown-item" id="CT1" value="CT1" data-order="4">문화시설</option>
        <option class="dropdown-item" id="HP8" value="HP8" data-order="5">병원</option>
        <option class="dropdown-item" id="FD6" value="FD6" data-order="6">음식점</option>
        <option class="dropdown-item" id="CE7" value="CE7" data-order="7">카페</option>
      </select>
    </div>
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 94vh;
}
</style>
