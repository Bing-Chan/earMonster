"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDepartment = void 0;
const element_plus_1 = require("element-plus");
const vue_1 = require("vue");
const index_ts_1 = require("/@/api/org/index.ts");
/**
 * 字典hook
 * by Bing.Chan
 * @param dicTypeList =字典类型数组
 * @returns
 */
function useDepartment() {
    let useDepartmentList = (0, vue_1.ref)([]);
    const reloadList = async (orgCode) => {
        let res = await (0, index_ts_1.searchDept)({
            orgCode: orgCode,
        });
        if (res.status == 0) {
            useDepartmentList.value = res.data.map((x) => {
                return {
                    label: x.orgName,
                    value: x.orgCode,
                    desc: x.orgCodeLine,
                };
            });
        }
        else {
            element_plus_1.ElMessage.error(res.message);
        }
    };
    return {
        useDepartmentList,
        reloadList,
    };
}
exports.useDepartment = useDepartment;
