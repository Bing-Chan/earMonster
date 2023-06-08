export const NUMBER_TYPE = {
	infinity: '∞',
};

//阶梯类型
export const SCOPE_TYPE = {
	closeBegin: { name: '[', code: 1 }, //闭区间 包含
	closeEnd: { name: ']', code: 1 }, //闭区间 包含
	openBegin: { name: '(', code: 2 }, //开区间不包含
	openEnd: { name: ')', code: 2 }, //开区间不包含
};
