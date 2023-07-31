"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//二次处理圆通请求插件
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
const storage_ts_1 = require("/@/utils/storage.ts");
const request = vue3_sdk_1.YtoHttp;
request.http.interceptors.request.use((config) => {
    const isSessionNull = !vue3_sdk_1.SecurityUtils.authorization || vue3_sdk_1.SecurityUtils.authorization == '';
    const isCookieNull = !storage_ts_1.Cookie.get('authorization') || storage_ts_1.Cookie.get('authorization') == '';
    if (isSessionNull && !isCookieNull) {
        config.headers.common['authorization'] = `${storage_ts_1.Cookie.get('authorization')}`;
        config.headers.common['access-token'] = `${storage_ts_1.Cookie.get('access-token')}`;
        config.headers.common['refresh-token'] = `${storage_ts_1.Cookie.get('refresh-token')}`;
        config.headers.common['expires-at'] = `${storage_ts_1.Cookie.get('expires-at')}`;
        window.sessionStorage.setItem('system-config', storage_ts_1.Cookie.get('system-config'));
        window.sessionStorage.setItem('system-code', storage_ts_1.Cookie.get('system-code'));
        window.sessionStorage.setItem('expires-at', storage_ts_1.Cookie.get('expires-at'));
        window.sessionStorage.setItem('system-userInfo', storage_ts_1.Cookie.get('system-userInfo'));
        window.sessionStorage.setItem('access-token', storage_ts_1.Cookie.get('access-token'));
        window.sessionStorage.setItem('refresh-token', storage_ts_1.Cookie.get('refresh-token'));
        window.sessionStorage.setItem('authorization', storage_ts_1.Cookie.get('authorization'));
        window.sessionStorage.setItem('system-user-code-sign', storage_ts_1.Cookie.get('system-user-code-sign'));
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
request.http.interceptors.response.use((res) => {
    if (res.status == 200) {
        return res;
    }
    else {
        //SecurityUtils.removeAuthorization();
    }
}, (error) => {
    return Promise.reject(error);
});
// 导出 axios 实例
exports.default = request;
