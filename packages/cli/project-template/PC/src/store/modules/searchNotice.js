"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchNoticeModule = {
    namespaced: true,
    state: {
        searchMsg: '',
    },
    getters: {
        getSearchMsg(state) {
            return state.searchMsg;
        },
    },
    mutations: {
        setSearchMsg(state, str) {
            state.searchMsg = str;
        },
    },
    actions: {
        async writeSearch({ commit }, str) {
            commit('setSearchMsg', str);
        }
    }
};
exports.default = searchNoticeModule;
