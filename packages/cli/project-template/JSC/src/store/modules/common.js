import dayjs from 'dayjs'
const yestoday = new Date(Date.now() - 1000 * 3600 * 24)
const state = {
    dateStateValue: 'dateVale',
    isLoading: false,
    activeType: 'date',
    currentDate: new Date(Date.now() - 1000 * 3600 * 24),
    // customStartDay: new Date(Date.now() - 16000*3600*24),
    customStartDay: new Date(Date.now() - 15000 * 3600 * 24),
    customEndDay: new Date(Date.now() - 1000 * 3600 * 24),
    isNullData: false,
    timeFlag: true,
    pageType: '', //页面类型
    pageSearchValues: {}, //页面搜索的值
    pageHistory: 1
    //isShowSildeTip:true

};
const getters = {};
const mutations = {
    switchType(state, val) {
        if (val instanceof Array) { //判断val是否为数组
            state.activeType = val[0];
            switch (val[0]) {
                case 'date':
                    state.currentDate = new Date()
                    break
                case 'custom':
                    if (state.pageType != 'orderTrack') {
                        state.customStartDay = new Date(Date.now() - 14000 * 3600 * 24)
                        state.customEndDay = new Date()
                    }
                    break
                case 'month':
                    state.currentDate = new Date(dayjs().subtract(1, 'month').format('YYYY-MM-DD'))
                    break;
                default:
                    state.currentDate = new Date()
                    break
            }

        } else {
            state.activeType = val
            switch (val) {
                case 'date':
                    state.currentDate = new Date()
                    state.currentDate = yestoday
                    break
                case 'custom':
                    // state.customStartDay = new Date(Date.now() - 16000 * 3600 * 24)
                    if (state.pageType != 'orderTrack') {
                        state.customStartDay = new Date(Date.now() - 15000 * 3600 * 24)
                        state.customEndDay = yestoday
                    }
                    break;
                case 'month':
                    state.currentDate = new Date(dayjs().subtract(1, 'month').format('YYYY-MM-DD'))
                    break;
                default:
                    state.currentDate = new Date()
                    break
            }
        }

    },
    setSwitchBtnType(state, val) {
        state.activeType = val
        if (val === 'custom') {
            // state.customStartDay = new Date(Date.now() - 16000 * 3600 * 24)
            if (state.pageType != 'orderTrack') {
                state.customStartDay = new Date(Date.now() - 15000 * 3600 * 24);
                state.customEndDay = yestoday;
            }

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
    },
    /**
     * 储存或者删除 当前页面的搜索条件
     */
    setPageSearchValues (state, data) {
        const [key, name, code] = data || [];
        if (!key) return;
        state.pageSearchValues = {
            ...state.pageSearchValues,
            [key + 'name']: name || '',
            [key + 'code']: code || ''
        }
    },
    setPageHistory(state, val) {
      state.pageHistory = val;
    }
};
const actions = {
  commitPageHistory(context, pageHistory) {
    context.commit("setPageHistory", pageHistory);
  }
};
export default {
  namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
};
