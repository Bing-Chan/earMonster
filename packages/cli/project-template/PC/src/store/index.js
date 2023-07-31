"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = exports.store = exports.key = void 0;
const vuex_1 = require("vuex");
// Vite supports importing multiple modules from the file system using the special import.meta.glob function
// see https://cn.vitejs.dev/guide/features.html#glob-import
const modulesFiles = import.meta.globEager('./modules/*.ts');
const pathList = [];
for (const path in modulesFiles) {
    pathList.push(path);
}
const modules = pathList.reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1');
    const value = modulesFiles[modulePath];
    modules[moduleName] = value.default;
    return modules;
}, {});
exports.key = Symbol();
exports.store = (0, vuex_1.createStore)({ modules });
function useStore() {
    return (0, vuex_1.useStore)(exports.key);
}
exports.useStore = useStore;
