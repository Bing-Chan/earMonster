import { Module } from 'vuex';
import { YtoHttp } from '@yto-security/vue3-sdk';
// 此处加上 `.ts` 后缀报错，具体原因不详
import { UserInfosState, RootStateTypes } from '/@/store/interface/index';
import { Cookie } from '/@/utils/storage.ts';

const userInfosModule: Module<UserInfosState, RootStateTypes> = {
	namespaced: true,
	state: {
		userInfos: {
			avatar: '', //用户头像
			userName: '', //用户名
			userId: '', //用户工号
		},
		showStep: false,
	},
	mutations: {
		// 设置用户信息
		getUserInfos(state: any, data: object) {
			state.userInfos = data;
		},
		// 是否显示新手引导页
		getShowStep(state: any, bool: Boolean) {
			state.showStep = bool;
		},
	},
	actions: {
		// 设置用户信息
		async getUserInfos({ commit }) {
			//用户信息最后要是用session会话保存，防止丢失
			const res = await YtoHttp.get('user/getUserInfo');
			commit('getUserInfos', res.data);
			if (!Cookie.get('authorization') || sessionStorage.getItem('authorization') != Cookie.get('authorization')) {
				Cookie.set('access-token', sessionStorage.getItem('access-token'));
				Cookie.set('system-config', sessionStorage.getItem('system-config'));
				Cookie.set('system-code', sessionStorage.getItem('system-code'));
				Cookie.set('expires-at', sessionStorage.getItem('expires-at'));
				Cookie.set('system-userInfo', sessionStorage.getItem('system-userInfo'));
				Cookie.set('refresh-token', sessionStorage.getItem('refresh-token'));
				Cookie.set('authorization', sessionStorage.getItem('authorization'));
				Cookie.set('system-user-code-sign', sessionStorage.getItem('system-user-code-sign'));
			}
		},
		// 设置是否显示新手引导页
		async setShowStep({ commit }, bool: Boolean) {
			commit('getShowStep', bool);
		},
	},
};

export default userInfosModule;
