"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserStore = void 0;
const useCookies_1 = require("@vueuse/integrations/useCookies");
const pinia_1 = require("pinia");
const { VITE_TOKEN_KEY } = import.meta.env;
const token = (0, useCookies_1.useCookies)().get(VITE_TOKEN_KEY);
exports.useUserStore = (0, pinia_1.defineStore)({
    id: 'app-user',
    state: () => ({
        token: token,
        info: {},
    }),
    getters: {
        getUserInfo() {
            return this.info || {};
        },
    },
    actions: {
        setInfo(info) {
            this.info = info ? info : '';
        },
        login() {
            return new Promise((resolve) => {
                const { execute } = loginPassword();
                execute().then((res) => {
                    this.setInfo(res);
                    resolve(res);
                });
            });
        },
    },
    persist: {
        key: 'token',
        storage: localStorage,
        paths: ['token'],
    },
});
