import { YtoHttp } from '@yto-security/vue3-sdk';

export function getParamsList(params) {
  return YtoHttp.post('paramlibrary/list',params)
}
export function deleteParameter(params) {
  return YtoHttp.post('paramlibrary/del', params)
}
export function addParams(params) {
  return YtoHttp.post('paramlibrary/add', params)
}
export function editParams(params) {
  return YtoHttp.post('paramlibrary/update', params)
}

