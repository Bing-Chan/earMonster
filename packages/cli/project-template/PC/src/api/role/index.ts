import { YtoHttp } from '@yto-security/vue3-sdk';

/**
 * @description 列表
 * @returns
 */
export function getRoleList(params) {
	return YtoHttp.post('flowRole/list', params);
}


/**
 * @description 用户列表
 * @returns
 */
export function getRoleUserList(params) {
	return YtoHttp.post('flowRole/user/list', params);
}

/**
 * @description 新增
 * @returns
 */
export function roleAdd(params) {
	return YtoHttp.post('flowRole/add', params);
}

/**
 * @description 修改
 * @returns
 */
export function roleUpate(params) {
	return YtoHttp.post('flowRole/update', params);
}

/**
 * @description 显示
 * @returns
 */
export function roleDisplay(params) {
	return YtoHttp.post('flowRole/display', params);
}

/**
 * @description 删除
 * @returns
 */
export function roleDelete(params) {
	return YtoHttp.post('flowRole/delete', params);
}


/**
 * @description 
 * @returns
 */
export function roleUserAdd(params) {
	return YtoHttp.post('flowRole/user/add', params);
}


/**
 * @description 
 * @returns
 */
export function roleUserDelete(params) {
	return YtoHttp.post('flowRole/user/delete', params);
}

/**
 * @description  修改
 * @returns
 */
export function roleUserUpdate(params) {
	return YtoHttp.post('flowRole/user/update', params);
}





