import { instance } from "@/util/http-common";

const url = '/notices'

const listNotice = (param: string, success: any, fail: any) => {
  instance.get(`${url}`, { params: param }).then(success).catch(fail)
}

const detailNotice = (noticeId: number, success: any, fail: any) => {
  instance.get(`${url}/${noticeId}`).then(success).catch(fail)
}

const postNotice = (notice: Object, success: any, fail: any) => {
  instance.post(`${url}`, JSON.stringify(notice)).then(success).catch(fail)
}

// const getModifyNotice = (noticeId: number, success, fail) => {
//   instance.get(`${url}/`)
// }

// const modifyNotice = ()

const deleteNotice = (noticeId: number, success: any, fail: any) => {
  instance.delete(`${url}/${noticeId}`).then(success).catch(fail)
}

export {
  listNotice,
  detailNotice,
  postNotice,
  // getModifyNotice,
  // modifyNotice,
  deleteNotice
}