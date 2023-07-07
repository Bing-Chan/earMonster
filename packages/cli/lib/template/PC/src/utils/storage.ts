import Cookies from 'js-cookie';

/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export enum STORAGE_KEYS {
	// eslint-disable-next-line no-unused-vars
	ACCESS_TOKEN,
	// eslint-disable-next-line no-unused-vars
	NAVLIST, //导航菜单
	// eslint-disable-next-line no-unused-vars
	IS_PROCESS_SYS_ERROR, //是否已经处理子系统异常
}

export const Local = {
	// 设置永久缓存
	set(key: STORAGE_KEYS, val: any) {
		window.localStorage.setItem(key.toString(), JSON.stringify(val));
	},
	// 获取永久缓存
	get(key: STORAGE_KEYS) {
		let json: any = window.localStorage.getItem(key.toString());
		return JSON.parse(json);
	},
	// 移除永久缓存
	remove(key: STORAGE_KEYS) {
		window.localStorage.removeItem(key.toString());
	},
	// 移除全部永久缓存
	clear() {
		window.localStorage.clear();
	},
};

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
	// 设置临时缓存
	set(key: STORAGE_KEYS, val: any) {
		window.sessionStorage.setItem(key.toString(), JSON.stringify(val));
	},
	// 获取临时缓存
	get(key: STORAGE_KEYS) {
		let json: any = window.sessionStorage.getItem(key.toString());
		return JSON.parse(json);
	},
	// 移除临时缓存
	remove(key: STORAGE_KEYS) {
		window.sessionStorage.removeItem(key.toString());
	},
	// 移除全部临时缓存
	clear() {
		window.sessionStorage.clear();
	},
};

/**
 * cookie
 * @method set 设置
 * @method get 获取
 * @method remove 移除
 * @method clear 移除全部
 */
export const Cookie = {
	// 设置临时缓存
	set(key: String, val: any) {
		const time = new Date(new Date().getTime() + 12 * 60 * 60 * 1000);
		Cookies.set(key.toString(), val, { expires: time });
	},
	// 获取临时缓存
	get(key) {
		return Cookies.get(key);
	},
	// 移除临时缓存
	remove(key) {
		Cookies.remove(key);
	},
};
