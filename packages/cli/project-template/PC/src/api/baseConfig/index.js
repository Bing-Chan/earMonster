"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchIndicator = exports.searchUnit = exports.getPosition = exports.getSystemTime = exports.getDictionary = exports.dictDataDelete = exports.dictDateUpdate = exports.dictDataInsert = exports.getDicDetail = exports.updataDictType = exports.insertDictType = exports.getDicList = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
/**
 * 数据字典列表
 * @param params {}
 * @returns {}
 */
function getDicList(params) {
    return vue3_sdk_1.YtoHttp.post('dictType/page', params);
}
exports.getDicList = getDicList;
function insertDictType(params) {
    return vue3_sdk_1.YtoHttp.post('dictType/insert', params);
}
exports.insertDictType = insertDictType;
function updataDictType(params) {
    return vue3_sdk_1.YtoHttp.put('dictType/update', params);
}
exports.updataDictType = updataDictType;
function getDicDetail(params) {
    return vue3_sdk_1.YtoHttp.post('dictData/page', params);
}
exports.getDicDetail = getDicDetail;
function dictDataInsert(params) {
    return vue3_sdk_1.YtoHttp.post('dictData/insert', params);
}
exports.dictDataInsert = dictDataInsert;
function dictDateUpdate(params) {
    return vue3_sdk_1.YtoHttp.put('dictData/update', params);
}
exports.dictDateUpdate = dictDateUpdate;
function dictDataDelete(params) {
    return vue3_sdk_1.YtoHttp.put('dictData/delete', params);
}
exports.dictDataDelete = dictDataDelete;
function getDictionary(params) {
    return vue3_sdk_1.YtoHttp.post('dictData/init', params);
}
exports.getDictionary = getDictionary;
// 获取系统时间
function getSystemTime() {
    return vue3_sdk_1.YtoHttp.get('common/systemTime', {});
}
exports.getSystemTime = getSystemTime;
function getPosition() {
    return vue3_sdk_1.YtoHttp.post('processpositionconfig/list', {
        jobCode: '',
        jobName: '',
    });
}
exports.getPosition = getPosition;
// 搜索单位
function searchUnit(params) {
    return vue3_sdk_1.YtoHttp.get('paramlibrary/selectUnitName', { searchName: params });
}
exports.searchUnit = searchUnit;
// 搜索指标
function searchIndicator(jobType = 1) {
    return vue3_sdk_1.YtoHttp.get('quotalibrary/names', { jobType: jobType });
}
exports.searchIndicator = searchIndicator;
// // 搜索参数
// export function searchParameter() {
// 	return YtoHttp.post('paramlibrary/selectUnitName', {
// 		jobCode: '',
// 		jobName: '',
// 	});
// }
