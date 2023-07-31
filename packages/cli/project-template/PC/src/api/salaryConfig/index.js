"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSalaryConfig = exports.getSalaryConfig = exports.changeSalaryStatus = exports.deleteSalaryConfig = exports.addSalaryConfig = exports.getApplicableConfig = exports.getSummary = exports.getSalaryItemCategory = exports.getSalaryList = exports.getSalaryConfigAllList = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
// 薪资项所有
function getSalaryConfigAllList(params) {
    return vue3_sdk_1.YtoHttp.post('salaryitemconfig/noPageList', params);
}
exports.getSalaryConfigAllList = getSalaryConfigAllList;
function getSalaryList(params) {
    return vue3_sdk_1.YtoHttp.post('salaryitemconfig/list', params);
}
exports.getSalaryList = getSalaryList;
function getSalaryItemCategory() {
    return vue3_sdk_1.YtoHttp.post('salaryitemconfig/findSalaryItemCategory');
}
exports.getSalaryItemCategory = getSalaryItemCategory;
function getSummary(params) {
    return vue3_sdk_1.YtoHttp.post('salaryitemconfig/summary', params);
}
exports.getSummary = getSummary;
function getApplicableConfig(params) {
    return vue3_sdk_1.YtoHttp.get('applicableConfig/list', params);
}
exports.getApplicableConfig = getApplicableConfig;
function addSalaryConfig(params) {
    return vue3_sdk_1.YtoHttp.post('salaryitemconfig/add', params);
}
exports.addSalaryConfig = addSalaryConfig;
function deleteSalaryConfig(params) {
    return vue3_sdk_1.YtoHttp.post('salaryitemconfig/delete', params);
}
exports.deleteSalaryConfig = deleteSalaryConfig;
function changeSalaryStatus(params) {
    return vue3_sdk_1.YtoHttp.post('salaryitemconfig/on', params);
}
exports.changeSalaryStatus = changeSalaryStatus;
function getSalaryConfig(params) {
    return vue3_sdk_1.YtoHttp.post('salaryitemconfig/id', params);
}
exports.getSalaryConfig = getSalaryConfig;
function updateSalaryConfig(params) {
    return vue3_sdk_1.YtoHttp.post('salaryitemconfig/update', params);
}
exports.updateSalaryConfig = updateSalaryConfig;
