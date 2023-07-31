"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directive = void 0;
const authDirective_1 = require("/@/utils/authDirective");
const customDirective_1 = require("/@/utils/customDirective");
/**
 * 导出指令方法：v-xxx
 * @methods authDirective 用户权限指令，用法：v-auth
 * @methods wavesDirective 按钮波浪指令，用法：v-waves
 * @methods dragDirective 自定义拖动指令，用法：v-drag
 */
function directive(app) {
    // 用户权限指令
    (0, authDirective_1.authDirective)(app);
    // 按钮波浪指令
    (0, customDirective_1.wavesDirective)(app);
    // 自定义拖动指令
    (0, customDirective_1.dragDirective)(app);
}
exports.directive = directive;
