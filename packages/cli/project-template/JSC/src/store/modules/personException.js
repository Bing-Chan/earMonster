const state = {
    tabTypeTitle: "中心人员分析",
    headerTabType: "-1", // 顶部tab 国内国际
    zyjmType:"2",
    functionType: "attributes", //图表  用工属性、岗位条线
    tabMenu1Type: "", //第一个动态
    tabMenu2Type: "", //第二个动态
  };
  const getters = {};
  const mutations = {
    setTabTypeTitle(state, val) {
      state.tabTypeTitle = val;
    },
    setHeaderTabType(state, val) {
      state.headerTabType = val;
    },
    setZyjmType(state, val) {
      state.zyjmType = val;
    },
    setFunctionType(state, val) {
      state.functionType = val;
    },
    setTabMenu1Type(state, val) {
      state.tabMenu1Type = val;
    },
    setTabMenu2Type(state, val) {
      state.tabMenu2Type = val;
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