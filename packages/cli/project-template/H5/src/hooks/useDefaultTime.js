"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDefaultTime = void 0;
const dayjs_1 = require("dayjs");
const index_1 = require("/@/api/index");
function useDefaultTime(hook) {
    //获取字典方法
    async function initDefaultTime() {
        const res = await (0, index_1.getDefalutTime)();
        if (res.status == 0) {
            hook((0, dayjs_1.default)(res.data).format('YYYY年MM月DD日'));
        }
        else {
        }
    }
    onBeforeMount(() => {
        initDefaultTime();
    });
}
exports.useDefaultTime = useDefaultTime;
