import { YtoHttp } from "@yto-security/vue3-sdk";

export function getPage(params)  {
  return YtoHttp.post('section/price/page', params)
}
export function getSectionList(params) {
  return YtoHttp.post('section/price/detail/list', params)
}

export function checkPrice(params) {
  return YtoHttp.post('/section/price/check', params)
}

export function addPrice(params) {
  return YtoHttp.post('/section/price/save', params)
}

export function updatePrice(params) {
  return YtoHttp.post('/section/price/edit', params)
}

export function publishPrice(params) {
  return YtoHttp.post('/section/price/add', params)
}


export function modifyPriority(params) {
  return YtoHttp.post('section/price/updatePriority',params)
}

export function deletePrice(params) {
  return YtoHttp.post('section/price/delete', params)
}
