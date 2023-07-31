"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimeoutRef = exports.useTimeoutFn = void 0;
const vue_1 = require("vue");
const core_1 = require("@vueuse/core");
const is_1 = require("/@/utils/is");
function useTimeoutFn(handle, wait, native = false) {
    if (!(0, is_1.isFunction)(handle)) {
        throw new Error('handle is not Function!');
    }
    const { readyRef, stop, start } = useTimeoutRef(wait);
    if (native) {
        handle();
    }
    else {
        (0, vue_1.watch)(readyRef, (maturity) => {
            maturity && handle();
        }, { immediate: false });
    }
    return { readyRef, stop, start };
}
exports.useTimeoutFn = useTimeoutFn;
function useTimeoutRef(wait) {
    const readyRef = (0, vue_1.ref)(false);
    let timer;
    function stop() {
        readyRef.value = false;
        timer && window.clearTimeout(timer);
    }
    function start() {
        stop();
        timer = setTimeout(() => {
            readyRef.value = true;
        }, wait);
    }
    start();
    (0, core_1.tryOnUnmounted)(stop);
    return { readyRef, stop, start };
}
exports.useTimeoutRef = useTimeoutRef;
