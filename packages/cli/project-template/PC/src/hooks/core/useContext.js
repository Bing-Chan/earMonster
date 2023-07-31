"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContext = exports.createContext = void 0;
const vue_1 = require("vue");
function createContext(context, key = Symbol(), options = {}) {
    const { readonly = true, createProvider = false, native = false } = options;
    const state = (0, vue_1.reactive)(context);
    const provideData = readonly ? (0, vue_1.readonly)(state) : state;
    !createProvider && (0, vue_1.provide)(key, native ? context : provideData);
    return {
        state,
    };
}
exports.createContext = createContext;
function useContext(key = Symbol(), defaultValue) {
    return (0, vue_1.inject)(key, defaultValue || {});
}
exports.useContext = useContext;
