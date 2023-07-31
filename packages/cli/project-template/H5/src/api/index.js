"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefalutTime = void 0;
const useAxiosApi_1 = require("/@/utils/useAxiosApi");
/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
function getDefalutTime() {
    return (0, useAxiosApi_1.default)(`/h5/common/getSpecificDate`, {
        method: 'GET',
        data: {},
    });
}
exports.getDefalutTime = getDefalutTime;
