"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportFail = exports.indicatorDownTemplete = exports.uploadFile = exports.getPostList = exports.menuAuth = exports.searchCompany = exports.searchDept = exports.searchPersonAndCompany = exports.searchPerson = exports.searchList = exports.getChildren = exports.getAllOrgTree = exports.getOrgTree = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
/**
 * @description 组织
 * @author Bing.Chen  20211025
 */
/**
 * @description 查询组织树
 * @returns
 */
function getOrgTree(params) {
    return vue3_sdk_1.YtoHttp.post('dscytoorg/getAllUnitTree', params);
}
exports.getOrgTree = getOrgTree;
/**
 * @description 查询组织树
 * @returns
 */
function getAllOrgTree(params) {
    return vue3_sdk_1.YtoHttp.post('dscytoorg/getOrgTree', params);
}
exports.getAllOrgTree = getAllOrgTree;
/**
 * @description 查询子节点
 * @returns
 */
function getChildren(params) {
    return vue3_sdk_1.YtoHttp.post('dscytoorg/getAuthOrgDataNext', params);
}
exports.getChildren = getChildren;
/**
 * @description 搜索
 * @returns
 */
function searchList(params) {
    return vue3_sdk_1.YtoHttp.post('dscytoorg/searchAuthOrgDataList', params);
}
exports.searchList = searchList;
/**
 * @description 人员搜索
 * @returns
 */
function searchPerson(params) {
    return vue3_sdk_1.YtoHttp.post('dscytoorg/getperson', params);
}
exports.searchPerson = searchPerson;
/**
 * @description 人员搜索带单位
 * @returns
 */
function searchPersonAndCompany(params) {
    return vue3_sdk_1.YtoHttp.post('dscytoorg/searchAllPersonNext', params);
}
exports.searchPersonAndCompany = searchPersonAndCompany;
/**
 * @description 部门搜索
 * @returns
 */
function searchDept(params) {
    return vue3_sdk_1.YtoHttp.post('dscytoorg/searchAllDeptNext', params);
}
exports.searchDept = searchDept;
/**
 * @description 单位搜索
 * @returns
 */
function searchCompany(params) {
    return vue3_sdk_1.YtoHttp.post('dscytoorg/searchAllUnitNext', params);
}
exports.searchCompany = searchCompany;
/**
 * @description 菜单权限
 * @returns
 */
function menuAuth(params) {
    return vue3_sdk_1.YtoHttp.get('panorama/menuAuth', params);
}
exports.menuAuth = menuAuth;
/**
 * @description 菜单权限
 * @returns
 */
function getPostList(params) {
    return vue3_sdk_1.YtoHttp.post('dscytoorg/positionperson', params);
}
exports.getPostList = getPostList;
function uploadFile(params) {
    return vue3_sdk_1.YtoHttp.post('scheme/import', params);
}
exports.uploadFile = uploadFile;
function indicatorDownTemplete() {
    return vue3_sdk_1.YtoHttp.post('scheme/download', {}, { responseType: 'blob' });
}
exports.indicatorDownTemplete = indicatorDownTemplete;
function exportFail(params) {
    return vue3_sdk_1.YtoHttp.post(`scheme/downloadFailData?failKey=${params.failKey}`, null, { responseType: 'blob' });
}
exports.exportFail = exportFail;
