"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formulaUpdate = exports.formulaDelete = exports.formulaAdd = exports.formulaList = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
function formulaList(params) {
    return vue3_sdk_1.YtoHttp.post('quotaformulaconfigman/list', params);
}
exports.formulaList = formulaList;
function formulaAdd(params) {
    return vue3_sdk_1.YtoHttp.post('quotaformulaconfigman/add', params);
}
exports.formulaAdd = formulaAdd;
function formulaDelete(params) {
    return vue3_sdk_1.YtoHttp.post('quotaformulaconfigman/delete', params);
}
exports.formulaDelete = formulaDelete;
function formulaUpdate(params) {
    return vue3_sdk_1.YtoHttp.post('quotaformulaconfigman/update', params);
}
exports.formulaUpdate = formulaUpdate;
