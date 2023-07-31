const state = {
  tabTypeTitle: "操作工考勤",
  headerTabType: "1", // 顶部tab
  lineType: "2", //折线图tab
};
const getters = {};
const mutations = {
  setTabTypeTitle(state, val) {
    state.tabTypeTitle = val;
  },
  setHeaderTabType(state, val) {
    state.headerTabType = val;
  },
  setLineType(state, val) {
    state.lineType = val;
  },
};
const actions = {};
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
};