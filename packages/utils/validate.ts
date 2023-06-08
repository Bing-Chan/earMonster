import { SCOPE_TYPE, NUMBER_TYPE } from '@ear-monster/constants/number'

// 验证区间开始
export function validateStart(rule, value, callback, formData) {
	const reg = /^\d+.?\d{0,2}$/
	if (!value && value != '0') {
		callback(new Error('值不能为空'))
	} else if (!Number(value) && value != '0') {
		callback(new Error('输入值只能是整数、小数'))
	} else if (!reg.test(value)) {
		callback(new Error('小数点后最多只能输入两位'))
	} else {
		// //不能包含
		// if (formData.beginVal == formData.endVal && (formData.beginFlag == SCOPE_TYPE.openBegin.code || formData.endFlag == SCOPE_TYPE.openEnd.code)) {
		// 	callback(new Error('区间必须存在有效值'));
		// } else {
		//判断符号是否相同
		if (formData.beginFlag == formData.endFlag) {
			callback(new Error('左右区间符号不能相同！'))
		} else if (formData.endVal != '' && parseInt(formData.endVal) <= parseInt(formData.beginVal)) {
			callback(new Error(`左区间不能大于${formData.endVal}`))
		} else {
			callback()
		}
	}
}

// 验证区间结束
export function validateEnd(rule, value, callback, formData) {
	const reg = /^\d+.?\d{0,2}$/
	if (!value && value != '0') {
		callback(new Error('值不能为空'))
	} else if (value == NUMBER_TYPE.infinity) {
		callback()
	} else if (!Number(value) && value != '0') {
		callback(new Error('输入值只能是整数、小数'))
	} else if (!reg.test(value)) {
		callback(new Error('小数点后最多只能输入两位'))
	} else {
		//判断符号是否相同
		if (formData.beginFlag == formData.endFlag) {
			callback(new Error('左右区间符号不能相同！'))
		} else if (formData.beginVal != '' && parseInt(formData.endVal) <= parseInt(formData.beginVal)) {
			callback(new Error(`右区间不能小于${formData.beginVal}`))
		} else {
			callback()
		}
	}
}

export const toBeginFlag = begin => {
	if (begin == SCOPE_TYPE.closeBegin.code) {
		return SCOPE_TYPE.closeBegin.name
	}
	return SCOPE_TYPE.openBegin.name
}

export const toEndFlag = end => {
	if (end == SCOPE_TYPE.closeEnd.code) {
		return SCOPE_TYPE.closeEnd.name
	}
	return SCOPE_TYPE.openEnd.name
}
