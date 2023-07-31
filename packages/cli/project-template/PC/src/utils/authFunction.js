"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAll = exports.auths = exports.auth = void 0;
const index_ts_1 = require("/@/store/index.ts");
const arrayOperation_1 = require("/@/utils/arrayOperation");
/**
 * 单个权限验证
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
function auth(value) {
    return index_ts_1.store.state.userInfos.userInfos.authBtnList.some((v) => v === value);
}
exports.auth = auth;
/**
 * 多个权限验证，满足一个则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
function auths(value) {
    let flag = false;
    index_ts_1.store.state.userInfos.userInfos.authBtnList.map((val) => {
        value.map((v) => {
            if (val === v)
                flag = true;
        });
    });
    return flag;
}
exports.auths = auths;
/**
 * 多个权限验证，全部满足则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
function authAll(value) {
    return (0, arrayOperation_1.judementSameArr)(value, index_ts_1.store.state.userInfos.userInfos.authBtnList);
}
exports.authAll = authAll;
