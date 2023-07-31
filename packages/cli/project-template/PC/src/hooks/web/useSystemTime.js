"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSystemTime = void 0;
const element_plus_1 = require("element-plus");
const vue_1 = require("vue");
const dayjs_1 = require("dayjs");
const index_ts_1 = require("/@/api/baseConfig/index.ts");
function useSystemTime() {
    let sysTime = (0, vue_1.ref)();
    let defalutTime = (0, vue_1.ref)();
    let maxHour = (0, vue_1.ref)(21);
    //获取字典方法
    async function initSystemTime(callback) {
        let res = await (0, index_ts_1.getSystemTime)();
        if (res.status == 0) {
            callback(res.data);
        }
        else {
            element_plus_1.ElMessage.error(res.message);
        }
    }
    const toDefaultTime = (now) => {
        let t = (0, dayjs_1.default)(now);
        if (t.hour() >= maxHour.value) {
            return t.add(-1, 'day').format('YYYY-MM-DD');
        }
        return t.add(-2, 'day').format('YYYY-MM-DD');
    };
    return {
        toDefaultTime,
        initSystemTime,
        maxHour,
    };
}
exports.useSystemTime = useSystemTime;
