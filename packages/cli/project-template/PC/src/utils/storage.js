"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = exports.Session = exports.Local = exports.STORAGE_KEYS = void 0;
const js_cookie_1 = require("js-cookie");
/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
var STORAGE_KEYS;
(function (STORAGE_KEYS) {
    // eslint-disable-next-line no-unused-vars
    STORAGE_KEYS[STORAGE_KEYS["ACCESS_TOKEN"] = 0] = "ACCESS_TOKEN";
    // eslint-disable-next-line no-unused-vars
    STORAGE_KEYS[STORAGE_KEYS["NAVLIST"] = 1] = "NAVLIST";
    // eslint-disable-next-line no-unused-vars
    STORAGE_KEYS[STORAGE_KEYS["IS_PROCESS_SYS_ERROR"] = 2] = "IS_PROCESS_SYS_ERROR";
})(STORAGE_KEYS = exports.STORAGE_KEYS || (exports.STORAGE_KEYS = {}));
exports.Local = {
    // 设置永久缓存
    set(key, val) {
        window.localStorage.setItem(key.toString(), JSON.stringify(val));
    },
    // 获取永久缓存
    get(key) {
        let json = window.localStorage.getItem(key.toString());
        return JSON.parse(json);
    },
    // 移除永久缓存
    remove(key) {
        window.localStorage.removeItem(key.toString());
    },
    // 移除全部永久缓存
    clear() {
        window.localStorage.clear();
    },
};
/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
exports.Session = {
    // 设置临时缓存
    set(key, val) {
        window.sessionStorage.setItem(key.toString(), JSON.stringify(val));
    },
    // 获取临时缓存
    get(key) {
        let json = window.sessionStorage.getItem(key.toString());
        return JSON.parse(json);
    },
    // 移除临时缓存
    remove(key) {
        window.sessionStorage.removeItem(key.toString());
    },
    // 移除全部临时缓存
    clear() {
        window.sessionStorage.clear();
    },
};
/**
 * cookie
 * @method set 设置
 * @method get 获取
 * @method remove 移除
 * @method clear 移除全部
 */
exports.Cookie = {
    // 设置临时缓存
    set(key, val) {
        const time = new Date(new Date().getTime() + 12 * 60 * 60 * 1000);
        js_cookie_1.default.set(key.toString(), val, { expires: time });
    },
    // 获取临时缓存
    get(key) {
        return js_cookie_1.default.get(key);
    },
    // 移除临时缓存
    remove(key) {
        js_cookie_1.default.remove(key);
    },
};
