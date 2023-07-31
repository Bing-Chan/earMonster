"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salaryStructureInfo = exports.salaryStructureDelete = exports.salaryStructureEdit = exports.salaryStructureAdd = exports.getSalaryStructureList = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
// 薪资结构列表
function getSalaryStructureList(params) {
    return vue3_sdk_1.YtoHttp.post('salaryStructure/page', params);
}
exports.getSalaryStructureList = getSalaryStructureList;
// 新增
function salaryStructureAdd(params) {
    return vue3_sdk_1.YtoHttp.post('salaryStructure/add', params);
}
exports.salaryStructureAdd = salaryStructureAdd;
// 编辑
function salaryStructureEdit(params) {
    return vue3_sdk_1.YtoHttp.post('salaryStructure/edit', params);
}
exports.salaryStructureEdit = salaryStructureEdit;
// 删除
function salaryStructureDelete(params) {
    return vue3_sdk_1.YtoHttp.get('salaryStructure/delete', params);
}
exports.salaryStructureDelete = salaryStructureDelete;
// 详情
function salaryStructureInfo(params) {
    return vue3_sdk_1.YtoHttp.get('salaryStructure/view?id=' + params.id, {});
}
exports.salaryStructureInfo = salaryStructureInfo;
