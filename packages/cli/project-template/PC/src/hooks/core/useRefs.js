"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRefs = void 0;
const vue_1 = require("vue");
function useRefs() {
    const refs = (0, vue_1.ref)([]);
    (0, vue_1.onBeforeUpdate)(() => {
        refs.value = [];
    });
    const setRefs = (index) => (el) => {
        refs.value[index] = el;
    };
    return [refs, setRefs];
}
exports.useRefs = useRefs;
