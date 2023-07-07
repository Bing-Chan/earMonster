import { NUMBER_TYPE, PRICE_TYPE, SCOPE_TYPE } from '/@/utils/type';
import { toBeginFlagCode, toEndFlagCode } from '/@/utils/common';

// 校验小数2位
export function validateNumber2(rule, value, callback) {
	
	const reg = /^\d+.?\d{0,2}$/;
	if (!value && value != '0') {
		callback(new Error('值不能为空'));
	} else if (!Number(value) && value != '0') {
		callback(new Error('输入值只能是整数、小数'));
	} else {
		if (reg.test(value)) {
			callback();
		} else {
			callback(new Error('小数点后最多只能输入两位'));
		}
	}
}

// 校验小数5位
export function validateNumber5(rule, value, callback) {
	const reg = /^\d+.?\d{0,5}$/;
	if (!value && value != '0') {
		callback(new Error('值不能为空'));
	} else if (!Number(value) && value != '0') {
		callback(new Error('输入值只能是整数、小数'));
	} else {
		if (reg.test(value)) {
			callback();
		} else {
			callback(new Error('小数点后最多只能输入五位'));
		}
	}
}

// 验证区间值
export function validateScope(rule, value, callback) {
	const reg = /^\d+.?\d{0,5}$/;
	if (!value || value.length == 0) {
		callback(new Error('区间不能为空'));
	} else if (value[1] === '') {
		callback(new Error('左区间不能为空'));
	} else if (value[2] === '') {
		callback(new Error('右区间不能为空'));
	} else {
		callback();
	}
}

// 验证区间开始
export function validateStart(rule, value, callback, formData) {
	
	const reg = /^\d+.?\d{0,2}$/;
	if (!value && value != '0') {
		callback(new Error('值不能为空'));
	} else if (!Number(value) && value != '0') {
		callback(new Error('输入值只能是整数、小数'));
	} else if (!reg.test(value)) {
		callback(new Error('小数点后最多只能输入两位'));
	} else {
		// //不能包含
		// if (formData.beginVal == formData.endVal && (formData.beginFlag == SCOPE_TYPE.openBegin.code || formData.endFlag == SCOPE_TYPE.openEnd.code)) {
		// 	callback(new Error('区间必须存在有效值'));
		// } else {
		//判断符号是否相同
		if (formData.beginFlag == formData.endFlag) {
			callback(new Error('左右区间符号不能相同！'));
		} else if (formData.endVal !== '' && parseInt(formData.endVal) <= parseInt(formData.beginVal)) {
			callback(new Error(`左区间不能大于${formData.endVal}`));
		} else {
			callback();
		}
	}
}

// 验证区间结束
export function validateEnd(rule, value, callback, formData) {
	const reg = /^\d+.?\d{0,2}$/;
	if (!value && value != '0') {
		callback(new Error('值不能为空'));
	} else if (value == NUMBER_TYPE.infinity) {
		callback();
	} else if (!Number(value) && value != '0') {
		callback(new Error('输入值只能是整数、小数'));
	} else if (!reg.test(value)) {
		callback(new Error('小数点后最多只能输入两位'));
	} else {
		//判断符号是否相同
		if (formData.beginFlag == formData.endFlag) {
			callback(new Error('左右区间符号不能相同！'));
		} else if (formData.beginVal !== '' && parseInt(formData.endVal) <= parseInt(formData.beginVal)) {
			callback(new Error(`右区间不能小于${formData.beginVal}`));
		} else {
			callback();
		}
	}
}
