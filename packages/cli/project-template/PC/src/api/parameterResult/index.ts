import { YtoHttp } from '@yto-security/vue3-sdk';


export function paramResultList(params) {
  return YtoHttp.post('paramResult/list',params)
}

export function paramResultAdd(params) {
  return YtoHttp.post('paramResult/add',params)
}

export function paramResultUpdate(params) {
  return YtoHttp.post('paramResult/update',params)
}

export function paramResultDelete(params) {
  return YtoHttp.post('paramlibrary/list',params)
}


/**
 * @description 详情
 * @returns
 */
export function paramResultInfo(params) {
	return YtoHttp.post('paramResult/display', params);
}

/**
 * @description 导入
 * @returns
 */
export function uploadFile(params) {
	return YtoHttp.post('paramResult/import', params);
}

/**
 * @description 下载失败
 * @returns
 */
export function exportFail(params) {
	return YtoHttp.post('paramResult/import/downFailData', params, { responseType: 'blob' });
}


/**
 * @description 导出
 * @returns
 */
export function indicatorExport(params) {
	return YtoHttp.post('paramResult/export', params, { responseType: 'blob' });
}

/**
 * @description 下载模板
 * @returns
 */
export function indicatorDownTemplete(params) {
	return YtoHttp.post('paramResult/template/down', params, { responseType: 'blob' });
}