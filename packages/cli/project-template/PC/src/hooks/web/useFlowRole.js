"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFlowRole = void 0;
const element_plus_1 = require("element-plus");
const vue_1 = require("vue");
const index_ts_1 = require("/@/api/role/index.ts");
/**
 * 字典hook
 * by Bing.Chan
 * @param dicTypeList =字典类型数组
 * @returns
 */
function useFlowRole() {
    let useFlowRoleList = (0, vue_1.ref)([]);
    //获取字典方法
    async function initFlowRoleList() {
        let res = await (0, index_ts_1.getRoleList)({
            pageNo: 1,
            limit: 100,
        });
        if (res.status == 0) {
            useFlowRoleList.value = res.data.resultData;
        }
        else {
            element_plus_1.ElMessage.error(res.message);
        }
    }
    (0, vue_1.onBeforeMount)(() => {
        initFlowRoleList();
    });
    return {
        useFlowRoleList,
    };
}
exports.useFlowRole = useFlowRole;
