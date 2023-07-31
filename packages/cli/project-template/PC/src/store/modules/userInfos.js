"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
const storage_ts_1 = require("/@/utils/storage.ts");
const userInfosModule = {
    namespaced: true,
    state: {
        userInfos: {
            avatar: '',
            userName: '',
            userId: '', //用户工号
        },
        showStep: false,
    },
    mutations: {
        // 设置用户信息
        getUserInfos(state, data) {
            state.userInfos = data;
        },
        // 是否显示新手引导页
        getShowStep(state, bool) {
            state.showStep = bool;
        },
    },
    actions: {
        // 设置用户信息
        async getUserInfos({ commit }) {
            //用户信息最后要是用session会话保存，防止丢失
            const res = await vue3_sdk_1.YtoHttp.get('user/getUserInfo');
            commit('getUserInfos', res.data);
            if (!storage_ts_1.Cookie.get('authorization') || sessionStorage.getItem('authorization') != storage_ts_1.Cookie.get('authorization')) {
                storage_ts_1.Cookie.set('access-token', sessionStorage.getItem('access-token'));
                storage_ts_1.Cookie.set('system-config', sessionStorage.getItem('system-config'));
                storage_ts_1.Cookie.set('system-code', sessionStorage.getItem('system-code'));
                storage_ts_1.Cookie.set('expires-at', sessionStorage.getItem('expires-at'));
                storage_ts_1.Cookie.set('system-userInfo', sessionStorage.getItem('system-userInfo'));
                storage_ts_1.Cookie.set('refresh-token', sessionStorage.getItem('refresh-token'));
                storage_ts_1.Cookie.set('authorization', sessionStorage.getItem('authorization'));
                storage_ts_1.Cookie.set('system-user-code-sign', sessionStorage.getItem('system-user-code-sign'));
            }
        },
        // 设置是否显示新手引导页
        async setShowStep({ commit }, bool) {
            commit('getShowStep', bool);
        },
    },
};
exports.default = userInfosModule;
