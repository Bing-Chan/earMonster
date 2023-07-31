"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFlow = void 0;
const element_plus_1 = require("element-plus");
const vue_1 = require("vue");
const index_ts_1 = require("/@/api/flow/index.ts");
/**
 * 流程数组
 * by Bing.Chan
 * @returns
 */
function useFlow(flowType = 'sys_flow_type_main') {
    let useFlowList = (0, vue_1.ref)([]);
    //获取流程方法
    async function initFlowList() {
        var _a;
        let params = {
            pageNo: 1,
            limit: 100,
            flowStatus: 1,
            flowType: flowType,
        };
        let res = await (0, index_ts_1.getFlowList)((0, vue_1.toRaw)(params));
        if (res.status == 0) {
            useFlowList.value = (_a = res.data.resultData) !== null && _a !== void 0 ? _a : [];
        }
        else {
            element_plus_1.ElMessage.error(res.message);
        }
    }
    (0, vue_1.onBeforeMount)(() => {
        initFlowList();
    });
    return {
        useFlowList,
    };
}
exports.useFlow = useFlow;
