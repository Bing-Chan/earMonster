/* eslint-disable no-unused-vars */
/**
 * 时间控件取值
 */
export enum DateEnum {
	START,
	END,
}

/**
 * 操作类型
 */
export enum OperationEnum {
	ADD = 1,
	EDIT = 2,
	DELETE = 3,
}

/**
 * 操作类型
 */
export enum TodoEnum {
	DAISHEN = 1,
	YISHEN = 2,
	DAIYUE = 3,
	YIYUE = 4,
}

/***
 * 动态表格属性集合
 */
export interface TableProp {
	theadData: Array<any>;
	tbodyData: Array<any>;
}


//阶梯类型
export const SCOPE_TYPE = {
	closeBegin: { name: '[', code: 1 }, //闭区间 包含
	closeEnd: { name: ']', code: 1 }, //闭区间 包含
	openBegin: { name: '(', code: 2 }, //开区间不包含
	openEnd: { name: ')', code: 2 }, //开区间不包含
};


export const NUMBER_TYPE = {
	infinity: '∞',
};


//阶梯类型
export const PRICE_TYPE = {
	low: 1,
	base: 2,
	high: 3,
	up: 4,
	down: 5,
};

// 操作类型
export const OPERATION_TYPE = {
	add: '新增',
	update: '编辑',
	publish: '添加',
};
