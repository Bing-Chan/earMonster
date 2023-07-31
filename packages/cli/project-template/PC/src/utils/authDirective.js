"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authDirective = void 0;
const index_ts_1 = require("/@/store/index.ts");
const arrayOperation_1 = require("/@/utils/arrayOperation");
/**
 * 用户权限指令
 * @directive 单个权限验证（v-auth="xxx"）
 * @directive 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
 * @directive 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
 */
function authDirective(app) {
    // 单个权限验证（v-auth="xxx"）
    app.directive('auth', {
        mounted(el, binding) {
            if (!index_ts_1.store.state.userInfos.userInfos.authBtnList.some((v) => v === binding.value))
                el.parentNode.removeChild(el);
        },
    });
    // 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
    app.directive('auths', {
        mounted(el, binding) {
            let flag = false;
            index_ts_1.store.state.userInfos.userInfos.authBtnList.map((val) => {
                binding.value.map((v) => {
                    if (val === v)
                        flag = true;
                });
            });
            if (!flag)
                el.parentNode.removeChild(el);
        },
    });
    // 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
    app.directive('auth-all', {
        mounted(el, binding) {
            const flag = (0, arrayOperation_1.judementSameArr)(binding.value, index_ts_1.store.state.userInfos.userInfos.authBtnList);
            if (!flag)
                el.parentNode.removeChild(el);
        },
    });
}
exports.authDirective = authDirective;
