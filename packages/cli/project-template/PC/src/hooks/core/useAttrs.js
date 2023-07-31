"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAttrs = exports.entries = void 0;
const vue_1 = require("vue");
const DEFAULT_EXCLUDE_KEYS = ['class', 'style'];
const LISTENER_PREFIX = /^on[A-Z]/;
function entries(obj) {
    return Object.keys(obj).map((key) => [key, obj[key]]);
}
exports.entries = entries;
function useAttrs(params = {}) {
    const instance = (0, vue_1.getCurrentInstance)();
    if (!instance)
        return {};
    const { excludeListeners = false, excludeKeys = [], excludeDefaultKeys = true } = params;
    const attrs = (0, vue_1.shallowRef)({});
    const allExcludeKeys = excludeKeys.concat(excludeDefaultKeys ? DEFAULT_EXCLUDE_KEYS : []);
    // Since attrs are not reactive, make it reactive instead of doing in `onUpdated` hook for better performance
    instance.attrs = (0, vue_1.reactive)(instance.attrs);
    (0, vue_1.watchEffect)(() => {
        const res = entries(instance.attrs).reduce((acm, [key, val]) => {
            if (!allExcludeKeys.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))) {
                acm[key] = val;
            }
            return acm;
        }, {});
        attrs.value = res;
    });
    return attrs;
}
exports.useAttrs = useAttrs;
