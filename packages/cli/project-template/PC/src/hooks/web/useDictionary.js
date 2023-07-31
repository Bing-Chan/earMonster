"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDictionary = void 0;
const element_plus_1 = require("element-plus");
const vue_1 = require("vue");
const index_ts_1 = require("/@/api/baseConfig/index.ts");
/**
 * 字典hook
 * by Bing.Chan
 * @param dicTypeList =字典类型数组
 * @returns
 */
function useDictionary(dicTypeList = []) {
    let useDictionaryList = (0, vue_1.ref)([]);
    //获取字典方法
    async function initDictionaryList() {
        let res = await (0, index_ts_1.getDictionary)(dicTypeList);
        if (res.status == 0) {
            useDictionaryList.value = res.data;
        }
        else {
            element_plus_1.ElMessage.error(res.message);
        }
    }
    (0, vue_1.onBeforeMount)(() => {
        initDictionaryList();
    });
    return {
        useDictionaryList,
    };
}
exports.useDictionary = useDictionary;
