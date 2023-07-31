"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMountedOrActivated = void 0;
const vue_1 = require("vue");
function onMountedOrActivated(hook) {
    let mounted;
    (0, vue_1.onMounted)(() => {
        hook();
        (0, vue_1.nextTick)(() => {
            mounted = true;
        });
    });
    (0, vue_1.onActivated)(() => {
        if (mounted) {
            hook();
        }
    });
}
exports.onMountedOrActivated = onMountedOrActivated;
