import { YtoHttp } from '@yto-security/vue3-sdk';
/**
 * @description 组织
 * @author Bing.Chen  20211025
 */

/**
 * @description 查询组织树
 * @returns
 */
export function getOrgTree(params) {
	return YtoHttp.post('dscytoorg/getAllUnitTree', params);
}

/**
 * @description 查询组织树
 * @returns
 */
export function getAllOrgTree(params) {
	return YtoHttp.post('dscytoorg/getOrgTree', params);
}

/**
 * @description 查询子节点
 * @returns
 */
export function getChildren(params) {
	return YtoHttp.post('dscytoorg/getAuthOrgDataNext', params);
}

/**
 * @description 搜索
 * @returns
 */
export function searchList(params) {
	return YtoHttp.post('dscytoorg/searchAuthOrgDataList', params);
}

/**
 * @description 人员搜索
 * @returns
 */
export function searchPerson(params) {
	return YtoHttp.post('dscytoorg/getperson', params);
}

/**
 * @description 人员搜索带单位
 * @returns
 */
export function searchPersonAndCompany(params) {
	return YtoHttp.post('dscytoorg/searchAllPersonNext', params);
}

/**
 * @description 部门搜索
 * @returns
 */
export function searchDept(params) {
	return YtoHttp.post('dscytoorg/searchAllDeptNext', params);
}

/**
 * @description 单位搜索
 * @returns
 */
export function searchCompany(params) {
	return YtoHttp.post('dscytoorg/searchAllUnitNext', params);
}

/**
 * @description 菜单权限
 * @returns
 */
export function menuAuth(params) {
	return YtoHttp.get('panorama/menuAuth', params);
}

/**
 * @description 菜单权限
 * @returns
 */
export function getPostList(params) {
	return YtoHttp.post('dscytoorg/positionperson', params);
}

export function uploadFile(params) {
	return YtoHttp.post('scheme/import', params);
}

export function indicatorDownTemplete() {
	return YtoHttp.post('scheme/download', {}, { responseType: 'blob' });
}

export function exportFail(params) {
	return YtoHttp.post(`scheme/downloadFailData?failKey=${params.failKey}`, null, { responseType: 'blob' });
}
