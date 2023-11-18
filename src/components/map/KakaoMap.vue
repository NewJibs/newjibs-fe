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
  for (let i = 0; i < places.length; i++) {
    const marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), places[i].order)

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
</script>

<template>
  <div class="map_wrap">
    <div id="map"></div>
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
</template>

<style>
#map {
  width: 100%;
  height: 94vh;
}
.map_wrap, .map_wrap * {margin:0; padding:0;font-family:'Malgun Gothic',dotum,'돋움',sans-serif;font-size:12px;}
.map_wrap {position:relative;width:100%;height:350px;}
#category {position:absolute;top:10px;left:10px;border-radius: 5px; border:1px solid #909090;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);background: #fff;overflow: hidden;z-index: 2;}
#category li {float:left;list-style: none;width:50px;border-right:1px solid #acacac;padding:6px 0;text-align: center; cursor: pointer;}
#category li.on {background: #eee;}
#category li:hover {background: #ffe6e6;border-left:1px solid #acacac;margin-left: -1px;}
#category li:last-child{margin-right:0;border-right:0;}
#category li span {display: block;margin:0 auto 3px;width:27px;height: 28px;}
#category li .category_bg {background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png) no-repeat;}
#category li .bank {background-position: -10px 0;}
#category li .mart {background-position: -10px -36px;}
#category li .pharmacy {background-position: -10px -72px;}
#category li .oil {background-position: -10px -108px;}
#category li .cafe {background-position: -10px -144px;}
#category li .store {background-position: -10px -180px;}
#category li.on .category_bg {background-position-x:-46px;}
.placeinfo_wrap {position:absolute;bottom:28px;left:-150px;width:300px;}
.placeinfo {position:relative;width:100%;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;padding-bottom: 10px;background: #fff;}
.placeinfo:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
.placeinfo_wrap .after {content:'';position:relative;margin-left:-12px;left:50%;width:22px;height:12px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
.placeinfo a, .placeinfo a:hover, .placeinfo a:active{color:#fff;text-decoration: none;}
.placeinfo a, .placeinfo span {display: block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
.placeinfo span {margin:5px 5px 0 5px;cursor: default;font-size:13px;}
.placeinfo .title {font-weight: bold; font-size:14px;border-radius: 6px 6px 0 0;margin: -1px -1px 0 -1px;padding:10px; color: #fff;background: #d95050;background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
.placeinfo .tel {color:#0f7833;}
.placeinfo .jibun {color:#999;font-size:11px;margin-top:0;}
</style>