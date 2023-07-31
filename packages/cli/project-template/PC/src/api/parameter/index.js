"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editParams = exports.addParams = exports.deleteParameter = exports.getParamsList = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
function getParamsList(params) {
    return vue3_sdk_1.YtoHttp.post('paramlibrary/list', params);
}
exports.getParamsList = getParamsList;
function deleteParameter(params) {
    return vue3_sdk_1.YtoHttp.post('paramlibrary/del', params);
}
exports.deleteParameter = deleteParameter;
function addParams(params) {
    return vue3_sdk_1.YtoHttp.post('paramlibrary/add', params);
}
exports.addParams = addParams;
function editParams(params) {
    return vue3_sdk_1.YtoHttp.post('paramlibrary/update', params);
}
exports.editParams = editParams;
