import { Module } from 'vuex';
// 此处加上 `.ts` 后缀报错，具体原因不详
import { SearchNotice, RootStateTypes } from '/@/store/interface/index';

const searchNoticeModule: Module<SearchNotice,RootStateTypes> = {
	namespaced: true,
	state: {
    searchMsg: '',
	},
	getters: {
		getSearchMsg(state: any) {
			return state.searchMsg
		},
	},
	mutations: {
		setSearchMsg(state, str: String) {
			state.searchMsg = str
		},
  },
  actions: {
    async writeSearch({commit}, str: String) {
      commit('setSearchMsg', str)
    }
  }
};

export default searchNoticeModule;
