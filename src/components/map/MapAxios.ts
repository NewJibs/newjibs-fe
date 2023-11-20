import { instance } from '@/util/http-common'

//모든 집의 정보가 맵에 찍히는 interface
interface AptAll {
  aptCode: number //모든 매물의 아파트 번호
  lat: string //위도
  lng: string //경도
  minDealAmount: number //최저금액
  maxDealAmount: number //최고금액
}

//해당 아파트의 상세 정보
interface AptAllDetail {
  aptCode: number //아파트번호
  no: number //매물번호
  dealYear: number //거래년도
  dealMonth: number //거래월
  dealDay: number //거래일
  area: string //면적
  sidoName: string //서울특별시
  gugunName: string //종로구
  dongName: string //인의동
  buildYear: number //건축년도
  apartmentName: string //아파트 이름
  lat: string //위도
  lng: string //경도
}
