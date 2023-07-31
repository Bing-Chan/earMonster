"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleUserUpdate = exports.roleUserDelete = exports.roleUserAdd = exports.roleDelete = exports.roleDisplay = exports.roleUpate = exports.roleAdd = exports.getRoleUserList = exports.getRoleList = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
/**
 * @description 列表
 * @returns
 */
function getRoleList(params) {
    return vue3_sdk_1.YtoHttp.post('flowRole/list', params);
}
exports.getRoleList = getRoleList;
/**
 * @description 用户列表
 * @returns
 */
function getRoleUserList(params) {
    return vue3_sdk_1.YtoHttp.post('flowRole/user/list', params);
}
exports.getRoleUserList = getRoleUserList;
/**
 * @description 新增
 * @returns
 */
function roleAdd(params) {
    return vue3_sdk_1.YtoHttp.post('flowRole/add', params);
}
exports.roleAdd = roleAdd;
/**
 * @description 修改
 * @returns
 */
function roleUpate(params) {
    return vue3_sdk_1.YtoHttp.post('flowRole/update', params);
}
exports.roleUpate = roleUpate;
/**
 * @description 显示
 * @returns
 */
function roleDisplay(params) {
    return vue3_sdk_1.YtoHttp.post('flowRole/display', params);
}
exports.roleDisplay = roleDisplay;
/**
 * @description 删除
 * @returns
 */
function roleDelete(params) {
    return vue3_sdk_1.YtoHttp.post('flowRole/delete', params);
}
exports.roleDelete = roleDelete;
/**
 * @description
 * @returns
 */
function roleUserAdd(params) {
    return vue3_sdk_1.YtoHttp.post('flowRole/user/add', params);
}
exports.roleUserAdd = roleUserAdd;
/**
 * @description
 * @returns
 */
function roleUserDelete(params) {
    return vue3_sdk_1.YtoHttp.post('flowRole/user/delete', params);
}
exports.roleUserDelete = roleUserDelete;
/**
 * @description  修改
 * @returns
 */
function roleUserUpdate(params) {
    return vue3_sdk_1.YtoHttp.post('flowRole/user/update', params);
}
exports.roleUserUpdate = roleUserUpdate;
