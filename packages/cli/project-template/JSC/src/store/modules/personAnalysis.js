const state = {
    tabTypeTitle: "中心人员分析",
    headerTabType: "1", // 顶部tab
    chartTabType: "all", //图表tab
    dimensionType: "1", //明细维度切换
    chartTabListB:"e0",
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