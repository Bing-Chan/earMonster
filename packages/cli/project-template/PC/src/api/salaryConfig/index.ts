import { YtoHttp, configYtoHttpConfig } from '@yto-security/vue3-sdk';

// 薪资项所有
export function getSalaryConfigAllList(params) {
	return YtoHttp.post('salaryitemconfig/noPageList', params);
}

export function getSalaryList(params) {
	return YtoHttp.post('salaryitemconfig/list', params);
}

export function getSalaryItemCategory() {
	return YtoHttp.post('salaryitemconfig/findSalaryItemCategory')
}

export function getSummary(params : any) {
	return YtoHttp.post('salaryitemconfig/summary', params)
}

export function getApplicableConfig(params){
	return YtoHttp.get('applicableConfig/list', params)
}

export function addSalaryConfig(params){
	return YtoHttp.post('salaryitemconfig/add', params)
}

export function deleteSalaryConfig(params){
	return YtoHttp.post('salaryitemconfig/delete', params)
}

export function changeSalaryStatus(params){
	return YtoHttp.post('salaryitemconfig/on', params)
}

export function getSalaryConfig(params){
	return YtoHttp.post('salaryitemconfig/id', params)
}

export function updateSalaryConfig(params){
	return YtoHttp.post('salaryitemconfig/update', params)
}