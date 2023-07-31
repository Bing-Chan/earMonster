"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLockFn = void 0;
const vue_1 = require("vue");
function useLockFn(fn) {
    const lockRef = (0, vue_1.ref)(false);
    return async function (...args) {
        if ((0, vue_1.unref)(lockRef))
            return;
        lockRef.value = true;
        try {
            const ret = await fn(...args);
            lockRef.value = false;
            return ret;
        }
        catch (e) {
            lockRef.value = false;
            throw e;
        }
    };
}
exports.useLockFn = useLockFn;
