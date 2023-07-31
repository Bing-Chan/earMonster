"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePosition = void 0;
const element_plus_1 = require("element-plus");
const vue_1 = require("vue");
const index_ts_1 = require("/@/api/baseConfig/index.ts");
/**
 * 工序岗位
 * by Bing.Chan
 * @returns
 */
function usePosition() {
    let usePositionList = (0, vue_1.ref)([]);
    //获取字典方法
    async function initPositionList() {
        let res = await (0, index_ts_1.getPosition)();
        if (res.status == 0) {
            usePositionList.value = res.data.map((x) => {
                return Object.assign(Object.assign({}, x), { name: `${x.jobCode} ${x.jobName}` });
            });
        }
        else {
            element_plus_1.ElMessage.error(res.message);
        }
    }
    (0, vue_1.onBeforeMount)(() => {
        initPositionList();
    });
    return {
        usePositionList,
    };
}
exports.usePosition = usePosition;
