import { YtoHttp } from '@yto-security/vue3-sdk';

//  获取模板详情
export function getTemplateInfo(params) {
	return YtoHttp.get('template/detail', params);
}

//  获取模板列表
export function getTemplateList(params) {
	return YtoHttp.post('template/page', params);
}

//  新增
export function templateAdd(params) {
	return YtoHttp.post('template/insert', params);
}

//  更新
export function templateUpdate(params) {
	return YtoHttp.put('template/update', params);
}

//  禁用
export function templateDisable(params) {
	return YtoHttp.put(`template/enableOrDisable`, params);
}

//  删除
export function templateDelete(params) {
	return YtoHttp.get('template/delete', params);
}

//  复制
export function templateCopy(params) {
	return YtoHttp.put('template/copy', params);
}

//  预览
export function templateReview(params) {
	return YtoHttp.get('template/preview', params);
}

/**
 * 获取模块详情
 * @param params {}
 * @returns {}
 */
export function getModelInfo(params: object) {
	return new Promise((resolve) => {
		resolve({
			status: 0,
			message: 'success',
			data: {
				basic: {
					name: params.name,
					tag: params.tag,
					desc: '测试描述',
				},
				zhibiao: [],
			},
		});
	});
}

//  新增模块
export function modelAdd(params) {
	return YtoHttp.post(`templateModule/insert`, params);
}

//  模块详情
export function modelDetail(params) {
	return YtoHttp.post(`templateModule/detail`, params);
}

// 模板保存
export function modelSort(params) {
	return YtoHttp.post(`templateModule/sort`, params);
}
// 模板保存
export function modelDelete(params) {
	return YtoHttp.get(`templateModule/delete`, params);
}

// 模板保存
export function modelSave(params) {
	return YtoHttp.post(`templateModule/save`, params);
}

//  模块列表
export function getModelList(params) {
	return YtoHttp.get(`templateModule/findList`, params);
}

//  校验公式
export function checkFormula(params) {
	return YtoHttp.post(`ql/checkEx`, params);
}

//  返回解析值
export function getQlAnalysisList(params) {
	return YtoHttp.post(`quotalibrary/getQlAnalysisList`, params);
}

//AddType
export enum AddType {
	// eslint-disable-next-line no-unused-vars
	ADD_MODEL = 'model', // 新增模块
	// eslint-disable-next-line no-unused-vars
	ADD_ZHIBIAO = 'zhibiao', //指标引入
	// eslint-disable-next-line no-unused-vars
	ADD_YIPIAOFOUJUE = 'yipiao', //一票否决
	// eslint-disable-next-line no-unused-vars
	ADD_JISUANGONGSHI = 'jisuangongshi', //计算公式
	// eslint-disable-next-line no-unused-vars
	ADD_YULAN = 'yulan', //计算公式
}
