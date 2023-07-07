//二次处理圆通请求插件
import { SecurityUtils, YtoHttp } from '@yto-security/vue3-sdk';
import { Cookie } from '/@/utils/storage.ts';
const request = YtoHttp;
request.http.interceptors.request.use(
	(config) => {
		const isSessionNull = !SecurityUtils.authorization || SecurityUtils.authorization == '';
		const isCookieNull = !Cookie.get('authorization') || Cookie.get('authorization') == '';
		if (isSessionNull && !isCookieNull) {
			config.headers.common['authorization'] = `${Cookie.get('authorization')}`;
			config.headers.common['access-token'] = `${Cookie.get('access-token')}`;
			config.headers.common['refresh-token'] = `${Cookie.get('refresh-token')}`;
			config.headers.common['expires-at'] = `${Cookie.get('expires-at')}`;

			window.sessionStorage.setItem('system-config', Cookie.get('system-config'));
			window.sessionStorage.setItem('system-code', Cookie.get('system-code'));
			window.sessionStorage.setItem('expires-at', Cookie.get('expires-at'));
			window.sessionStorage.setItem('system-userInfo', Cookie.get('system-userInfo'));
			window.sessionStorage.setItem('access-token', Cookie.get('access-token'));
			window.sessionStorage.setItem('refresh-token', Cookie.get('refresh-token'));
			window.sessionStorage.setItem('authorization', Cookie.get('authorization'));
			window.sessionStorage.setItem('system-user-code-sign', Cookie.get('system-user-code-sign'));
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

request.http.interceptors.response.use(
	(res) => {
		if (res.status == 200) {
			return res;
		} else {
			//SecurityUtils.removeAuthorization();
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default request;
