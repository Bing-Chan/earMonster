"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotal = exports.getDaySalaryList = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
function getDaySalaryList(params) {
    return vue3_sdk_1.YtoHttp.post('result/daySalaryList', params);
}
exports.getDaySalaryList = getDaySalaryList;
function getTotal(params) {
    return vue3_sdk_1.YtoHttp.post('result/daySalaryTotal', params);
}
exports.getTotal = getTotal;
