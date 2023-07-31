import { YtoHttp } from '@yto-security/vue3-sdk';

export function formulaList(params) {
	return YtoHttp.post('quotaformulaconfigman/list', params);
}

export function formulaAdd(params) {
	return YtoHttp.post('quotaformulaconfigman/add', params);
}

export function formulaDelete(params) {
	return YtoHttp.post('quotaformulaconfigman/delete', params);
}

export function formulaUpdate(params) {
	return YtoHttp.post('quotaformulaconfigman/update', params);
}




