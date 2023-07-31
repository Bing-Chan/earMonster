"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionlable = exports.getRankList = void 0;
const useAxiosApi_1 = require("/@/utils/useAxiosApi");
/**
 * 获取排行榜
 * @returns UseAxiosReturn
 */
function getRankList(data) {
    return (0, useAxiosApi_1.default)(`/h5/dailyperformanceleader/list`, {
        method: 'POST',
        data: data,
    });
}
exports.getRankList = getRankList;
/**
 * 获取排行榜
 * @returns UseAxiosReturn
 */
function positionlable(data) {
    return (0, useAxiosApi_1.default)(`/h5/dailyperformanceleader/positionlable`, {
        method: 'POST',
        data: data,
    });
}
exports.positionlable = positionlable;
