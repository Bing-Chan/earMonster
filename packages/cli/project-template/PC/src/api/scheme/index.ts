import { YtoHttp } from "@yto-security/vue3-sdk";
import { exportList } from "../indicatorsLibrary";

export function addScheme(params) {
  return YtoHttp.post('scheme/add', params)
}

export function listOhter(params) {
  return YtoHttp.post('scheme/listother', params)
}

export function listtobeIssued(params) {
  return YtoHttp.post('scheme/listtobeissued', params)
}
/**
 * 终止考核表
 * @param params 
 * 
 */
export function schemeTermination(params) {
  return YtoHttp.post('scheme/termination',params)
}
/**
 * 复制考核表
 * @param params 
 */
export function schemeCopy(params) {
  return YtoHttp.post('scheme/copy', params)
}

/**
 * 修改考核表
 * @param params 
 */
export function schemeEdit(params) {
  return YtoHttp.post('scheme/update', params)
}

/**
 * 模板详情
 * @param params 
 */
export function drillSchemeName(params) {
  return YtoHttp.post('scheme/drillschemename', params)
}
/**
 * 立即下发考核表
 * @param params 
 */
export function schemeImmediately(params) {
  return YtoHttp.post('scheme/issueimmediately', params)
}

export function getScheme(params) {
  return YtoHttp.post('scheme/schemeDetail', params)
}

export function detailPc(params) {
  return YtoHttp.get('result/detailPc',params)
}