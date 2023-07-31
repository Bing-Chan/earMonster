import { SCOPE_TYPE } from './type';

export function getQueryVariable(url: string, variable: string) {
	var query = url.split('?')[1];
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return false;
}

export const toBeginFlag = (begin) => {
	if (begin == SCOPE_TYPE.closeBegin.code) {
		return SCOPE_TYPE.closeBegin.name;
	}
	return SCOPE_TYPE.openBegin.name;
};

export const toEndFlag = (end) => {
	if (end == SCOPE_TYPE.closeEnd.code) {
		return SCOPE_TYPE.closeEnd.name;
	}
	return SCOPE_TYPE.openEnd.name;
};

export const toBeginFlagCode = (begin) => {
	if (begin == SCOPE_TYPE.closeBegin.name) {
		return SCOPE_TYPE.closeBegin.code;
	}
	return SCOPE_TYPE.openBegin.code;
};

export const toEndFlagCode = (end) => {
	if (end == SCOPE_TYPE.closeEnd.name) {
		return SCOPE_TYPE.closeEnd.code;
	}
	return SCOPE_TYPE.openEnd.code;
};

export const toEndFlagByUp = (begin) => {
	// debugger
	if (begin == SCOPE_TYPE.closeBegin.code) {
		return SCOPE_TYPE.openEnd.code;
	}
	return SCOPE_TYPE.closeEnd.code;
};
