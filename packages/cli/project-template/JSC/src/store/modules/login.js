import utils from '@/utils/utils'
// import { orgTypeCustom,fullRountMenu } from '@/router/routerConfig'
const state = {
    token: '',
    userInfo: null
};

const getters = {

};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },

    setUserInfo: (state, userInfo) => {
        state.userInfo = userInfo;
    }
};

const actions = {
    commitToken(context, token) {
        context.commit('setToken', token)
    },

    commitUserInfo(context, userInfo) {
        context.commit('setUserInfo', userInfo)
    }
};

export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}