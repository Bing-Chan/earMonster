import { YtoHttp } from '@yto-security/vue3-sdk';
import { resolve } from 'dns';

/**
 * 数据字典列表
 * @param params {}
 * @returns {}
 */
export function getDicList(params) {
	return YtoHttp.post('dictType/page', params);
}

export function insertDictType(params) {
	return YtoHttp.post('dictType/insert', params);
}

export function updataDictType(params) {
	return YtoHttp.put('dictType/update', params);
}

export function getDicDetail(params) {
	return YtoHttp.post('dictData/page', params);
}

export function dictDataInsert(params) {
	return YtoHttp.post('dictData/insert', params);
}

export function dictDateUpdate(params) {
	return YtoHttp.put('dictData/update', params);
}

export function dictDataDelete(params) {
	return YtoHttp.put('dictData/delete', params);
}

export function getDictionary(params) {
	return YtoHttp.post('dictData/init', params);
}

// 获取系统时间
export function getSystemTime() {
	return YtoHttp.get('common/systemTime', {});
}

export function getPosition() {
	return YtoHttp.post('processpositionconfig/list', {
		jobCode: '',
		jobName: '',
	});
}

// 搜索单位
export function searchUnit(params) {
	return YtoHttp.get('paramlibrary/selectUnitName', { searchName: params });
}

// 搜索指标
export function searchIndicator(jobType = 1) {
	return YtoHttp.get('quotalibrary/names', { jobType: jobType });
}

// // 搜索参数
// export function searchParameter() {
// 	return YtoHttp.post('paramlibrary/selectUnitName', {
// 		jobCode: '',
// 		jobName: '',
// 	});
// }
