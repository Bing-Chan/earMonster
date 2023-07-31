const state = {
    dateStateValue: 'dateVale',
    isLoading: false,
    activeType: 'date',
    currentDate: '',
    customStartDay: '',
    customEndDay: '',
    isNullData: false,
    timeFlag: true,

};
const getters = {};
const mutations = {
    switchType(state, val) {
        state.activeType = val
        switch (val) {
            case 'date':
                state.currentDate = new Date(Date.now() - 1000 * 3600 * 24)
                break
            case 'custom':
                state.customStartDay = new Date(Date.now() - 15000 * 3600 * 24)
                state.customEndDay = new Date(Date.now() - 1000 * 3600 * 24)
                break
            default:
                state.currentDate = new Date(Date.now() - 1000 * 3600 * 24)
                break
        }

    },
    setActiveType(state, val) {
        state.activeType = val
    },
    setCurrentDate(state, val) {
        state.currentDate = val
    },
    setCustomStartDay(state, val) {
        state.customStartDay = val
    },
    setCustomEndDay(state, val) {
        state.customEndDay = val
    },
    setIsNullData(state, val) {
        state.isNullData = val
    },
    setIsTimeFlag(state, val) {
        state.timeFlag = val
    },
    showLoading(state, isLoad) {
        state.isLoading = isLoad
    },
    setPageType(state, val) {
        state.PageType = val
    }
};
const actions = {};
export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}
