"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePages = void 0;
const vue_1 = require("vue");
// 页面公用方法
function usePages(state) {
    const { proxy } = (0, vue_1.getCurrentInstance)();
    const getAssessCycleType = (assessCycleType) => {
        if (assessCycleType && state.dictionaryList && state.dictionaryList.length > 0) {
            return state.dictionaryList['sys_period'].find((x) => {
                return x.dictItemCode == assessCycleType;
            }).dictItem;
        }
        return '';
    };
    return {
        getAssessCycleType,
    };
}
exports.usePages = usePages;
