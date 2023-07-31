import { YtoHttp } from "@yto-security/vue3-sdk";

export function getResult(params) {
  return YtoHttp.post('result/list', params)
}

export function resultExport(params) {
  return YtoHttp.post('result/export', params, {responseType: 'blob'})
}