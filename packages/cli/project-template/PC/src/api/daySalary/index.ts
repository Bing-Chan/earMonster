import { YtoHttp } from "@yto-security/vue3-sdk";

export function getDaySalaryList(params)  {
  return YtoHttp.post('result/daySalaryList', params)
}

export function getTotal(params) {
  return YtoHttp.post('result/daySalaryTotal', params)
}
