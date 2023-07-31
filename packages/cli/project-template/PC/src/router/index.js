"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
const index_ts_1 = require("./routes/index.ts");
/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
const router = (0, vue3_sdk_1.useYtoRouter)({
    //history: 'hash', //createWebHashHistory(),
    routes: index_ts_1.default,
});
exports.default = router;
