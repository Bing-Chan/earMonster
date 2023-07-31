import { YtoHttp } from '@yto-security/vue3-sdk';

/**
 * @description liebiao
 * @returns
 */
export function getFlowNode(params) {
	return YtoHttp.get('flowNode/initFlowNode', params);
}

/**
 * @description liebiao
 * @returns
 */
export function getFlowList(params) {
	return YtoHttp.post('flow/list', params);
}

/**
 * @description 发布
 * @returns
 */
export function releaseFlow(params) {
	return YtoHttp.post('flow/version/add', params);
}

/**
 * @description 删除
 * @returns
 */
export function flowDelete(params) {
	return YtoHttp.post('flow/delete', params);
}

/**
 * @description liebiao
 * @returns
 */
export function flowAdd(params) {
	return YtoHttp.post('flow/add', params);
}

/**
 * @description xiugai
 * @returns
 */
export function flowUpdate(params) {
	return YtoHttp.post('flow/update', params);
}

/**
 * @description xiugai
 * @returns
 */
export function flowInfo(params) {
	return YtoHttp.post('flow/display', params);
}

/**
 * @description 启用
 * @returns
 */
export function flowDisable(params) {
	return YtoHttp.post('flow/disable', params);
}

/**
 * @description 查询模板
 * @returns
 */
export function getTempListByFlowId(params) {
	return YtoHttp.get('flow/listTemplateByFlowId', params);
}

/**
 * @description  获取节点列表
 * @returns
 */
export function getNodeList(params) {
	return YtoHttp.post('flowNode/listFlowNodeByFlowId', params);
}

/**
 * @description  获取节点
 * @returns
 */
export function flowNodeInfo(params) {
	return YtoHttp.post('flowNode/display', params);
}

/**
 * @description  新增
 * @returns
 */
export function nodeAdd(params) {
	return YtoHttp.post('flowNode/add', params);
}

/**
 * @description  修改
 * @returns
 */
export function nodeUpdate(params) {
	return YtoHttp.post('flowNode/update', params);
}

/**
 * @description  排序
 * @returns
 */
export function nodeSort(params) {
	return YtoHttp.post('flowNode/sort', params);
}

/**
 * @description  删除
 * @returns
 */
export function nodeDelete(params) {
	return YtoHttp.post('flowNode/delete', params);
}
