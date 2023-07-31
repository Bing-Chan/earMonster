"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailPc = exports.getScheme = exports.schemeImmediately = exports.drillSchemeName = exports.schemeEdit = exports.schemeCopy = exports.schemeTermination = exports.listtobeIssued = exports.listOhter = exports.addScheme = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
function addScheme(params) {
    return vue3_sdk_1.YtoHttp.post('scheme/add', params);
}
exports.addScheme = addScheme;
function listOhter(params) {
    return vue3_sdk_1.YtoHttp.post('scheme/listother', params);
}
exports.listOhter = listOhter;
function listtobeIssued(params) {
    return vue3_sdk_1.YtoHttp.post('scheme/listtobeissued', params);
}
exports.listtobeIssued = listtobeIssued;
/**
 * 终止考核表
 * @param params
 *
 */
function schemeTermination(params) {
    return vue3_sdk_1.YtoHttp.post('scheme/termination', params);
}
exports.schemeTermination = schemeTermination;
/**
 * 复制考核表
 * @param params
 */
function schemeCopy(params) {
    return vue3_sdk_1.YtoHttp.post('scheme/copy', params);
}
exports.schemeCopy = schemeCopy;
/**
 * 修改考核表
 * @param params
 */
function schemeEdit(params) {
    return vue3_sdk_1.YtoHttp.post('scheme/update', params);
}
exports.schemeEdit = schemeEdit;
/**
 * 模板详情
 * @param params
 */
function drillSchemeName(params) {
    return vue3_sdk_1.YtoHttp.post('scheme/drillschemename', params);
}
exports.drillSchemeName = drillSchemeName;
/**
 * 立即下发考核表
 * @param params
 */
function schemeImmediately(params) {
    return vue3_sdk_1.YtoHttp.post('scheme/issueimmediately', params);
}
exports.schemeImmediately = schemeImmediately;
function getScheme(params) {
    return vue3_sdk_1.YtoHttp.post('scheme/schemeDetail', params);
}
exports.getScheme = getScheme;
function detailPc(params) {
    return vue3_sdk_1.YtoHttp.get('result/detailPc', params);
}
exports.detailPc = detailPc;
