const state = {
  tabTypeTitle: "操作人员分析",
  headerTabType: "1", // 顶部tab
  chartTabType: "all", //图表tab
  dimensionType: "org" //明细维度切换
};
const getters = {};
const mutations = {
  setTabTypeTitle(state, val) {
    state.tabTypeTitle = val;
  },
  setHeaderTabType(state, val) {
    state.headerTabType = val;
  },
  setChartTabType(state, val) {
    state.chartTabType = val;
  },
  setDimensionType(state, val) {
    state.dimensionType = val;
  }
};
const actions = {};
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
};
