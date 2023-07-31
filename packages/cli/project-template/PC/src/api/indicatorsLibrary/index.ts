import { YtoHttp } from '@yto-security/vue3-sdk';

export function getIndicatorsList(params) {
	return YtoHttp.post('quotalibrary/list', params);
}

export function searchQutotalLibrary(params) {
	return YtoHttp.post('quotalibrary/search', params);
}

export function searchQutoLibrary(params) {
	return YtoHttp.post('quotalibrary/searchop', params);
}

export function addQuotalibrary(params) {
	return YtoHttp.post('quotalibrary/add', params);
}

export function deleteQuotalibrary(params) {
	return YtoHttp.post('quotalibrary/del', params);
}

export function editQutotalLibrary(params) {
	return YtoHttp.post('quotalibrary/update', params);
}

export function quotaLibraryOn(params) {
	return YtoHttp.post('quotalibrary/on', params);
}

export function exportList(params) {
	return YtoHttp.post('quotalibrary/export', params, { responseType: 'blob' });
}

export function uploadFile(params) {
	return YtoHttp.post('quotalibrary/import', params);
}

export function exportDemo() {
	return YtoHttp.post('quotalibrary/exporttemplate', {}, { responseType: 'blob' });
}

export function exportFail(params) {
	return YtoHttp.get('quotalibrary/importfail', params, { responseType: 'blob' });
}

export function getParamLibraryList(params) {
	return YtoHttp.post('paramlibrary/list', params);
}

export function searchParamLibrary(params) {
	return YtoHttp.post('paramlibrary/search', params);
}

export function quotalibraryInfo(params) {
	return YtoHttp.post('quotalibrary/id', params);
}

//公式配置
export function formulaConfig(params) {
	return YtoHttp.post('quotalibrary/formulaconfig', params);
}
