"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultExport = exports.getResult = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
function getResult(params) {
    return vue3_sdk_1.YtoHttp.post('result/list', params);
}
exports.getResult = getResult;
function resultExport(params) {
    return vue3_sdk_1.YtoHttp.post('result/export', params, { responseType: 'blob' });
}
exports.resultExport = resultExport;
