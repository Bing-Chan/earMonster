"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPERATION_TYPE = exports.PRICE_TYPE = exports.NUMBER_TYPE = exports.SCOPE_TYPE = exports.TodoEnum = exports.OperationEnum = exports.DateEnum = void 0;
/* eslint-disable no-unused-vars */
/**
 * 时间控件取值
 */
var DateEnum;
(function (DateEnum) {
    DateEnum[DateEnum["START"] = 0] = "START";
    DateEnum[DateEnum["END"] = 1] = "END";
})(DateEnum = exports.DateEnum || (exports.DateEnum = {}));
/**
 * 操作类型
 */
var OperationEnum;
(function (OperationEnum) {
    OperationEnum[OperationEnum["ADD"] = 1] = "ADD";
    OperationEnum[OperationEnum["EDIT"] = 2] = "EDIT";
    OperationEnum[OperationEnum["DELETE"] = 3] = "DELETE";
})(OperationEnum = exports.OperationEnum || (exports.OperationEnum = {}));
/**
 * 操作类型
 */
var TodoEnum;
(function (TodoEnum) {
    TodoEnum[TodoEnum["DAISHEN"] = 1] = "DAISHEN";
    TodoEnum[TodoEnum["YISHEN"] = 2] = "YISHEN";
    TodoEnum[TodoEnum["DAIYUE"] = 3] = "DAIYUE";
    TodoEnum[TodoEnum["YIYUE"] = 4] = "YIYUE";
})(TodoEnum = exports.TodoEnum || (exports.TodoEnum = {}));
//阶梯类型
exports.SCOPE_TYPE = {
    closeBegin: { name: '[', code: 1 },
    closeEnd: { name: ']', code: 1 },
    openBegin: { name: '(', code: 2 },
    openEnd: { name: ')', code: 2 }, //开区间不包含
};
exports.NUMBER_TYPE = {
    infinity: '∞',
};
//阶梯类型
exports.PRICE_TYPE = {
    low: 1,
    base: 2,
    high: 3,
    up: 4,
    down: 5,
};
// 操作类型
exports.OPERATION_TYPE = {
    add: '新增',
    update: '编辑',
    publish: '添加',
};
