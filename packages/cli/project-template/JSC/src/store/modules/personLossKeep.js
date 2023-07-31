const state = {
    tabTypeTitle: "中心人员流动",
    headerTabType: "1", // 顶部tab
    chartTabType: "6", //图表tab
    lxchartTabType: "3",
    lineType: "1",
    // dimensionType: "org" //明细维度切换
    cbuttons: ['date', 'month', 'year']
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
    setlxChartTabType(state, val) {
      state.lxchartTabType = val;
    },
    setLineType(state, val) {
      state.lineType = val;
    },
    setDimensionType(state, val) {
      state.dimensionType = val;
    },
    setButtons (state, val) {
      state.cbuttons = val
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
