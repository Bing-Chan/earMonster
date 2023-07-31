"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indicatorDownTemplete = exports.indicatorExport = exports.exportFail = exports.uploadFile = exports.paramResultInfo = exports.paramResultDelete = exports.paramResultUpdate = exports.paramResultAdd = exports.paramResultList = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
function paramResultList(params) {
    return vue3_sdk_1.YtoHttp.post('paramResult/list', params);
}
exports.paramResultList = paramResultList;
function paramResultAdd(params) {
    return vue3_sdk_1.YtoHttp.post('paramResult/add', params);
}
exports.paramResultAdd = paramResultAdd;
function paramResultUpdate(params) {
    return vue3_sdk_1.YtoHttp.post('paramResult/update', params);
}
exports.paramResultUpdate = paramResultUpdate;
function paramResultDelete(params) {
    return vue3_sdk_1.YtoHttp.post('paramlibrary/list', params);
}
exports.paramResultDelete = paramResultDelete;
/**
 * @description 详情
 * @returns
 */
function paramResultInfo(params) {
    return vue3_sdk_1.YtoHttp.post('paramResult/display', params);
}
exports.paramResultInfo = paramResultInfo;
/**
 * @description 导入
 * @returns
 */
function uploadFile(params) {
    return vue3_sdk_1.YtoHttp.post('paramResult/import', params);
}
exports.uploadFile = uploadFile;
/**
 * @description 下载失败
 * @returns
 */
function exportFail(params) {
    return vue3_sdk_1.YtoHttp.post('paramResult/import/downFailData', params, { responseType: 'blob' });
}
exports.exportFail = exportFail;
/**
 * @description 导出
 * @returns
 */
function indicatorExport(params) {
    return vue3_sdk_1.YtoHttp.post('paramResult/export', params, { responseType: 'blob' });
}
exports.indicatorExport = indicatorExport;
/**
 * @description 下载模板
 * @returns
 */
function indicatorDownTemplete(params) {
    return vue3_sdk_1.YtoHttp.post('paramResult/template/down', params, { responseType: 'blob' });
}
exports.indicatorDownTemplete = indicatorDownTemplete;
