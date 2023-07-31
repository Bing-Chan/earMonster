import { YtoHttp, configYtoHttpConfig } from '@yto-security/vue3-sdk';

// 薪资结构列表
export function getSalaryStructureList(params) {
	return YtoHttp.post('salaryStructure/page', params);
}

// 新增
export function salaryStructureAdd(params) {
	return YtoHttp.post('salaryStructure/add', params);
}

// 编辑
export function salaryStructureEdit(params) {
	return YtoHttp.post('salaryStructure/edit', params);
}

// 删除
export function salaryStructureDelete(params) {
	return YtoHttp.get('salaryStructure/delete', params);
}

// 详情
export function salaryStructureInfo(params) {
	return YtoHttp.get('salaryStructure/view?id=' + params.id, {});
}
