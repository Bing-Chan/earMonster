"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinia_1 = require("pinia");
const pinia_plugin_persistedstate_1 = require("pinia-plugin-persistedstate");
const store = (0, pinia_1.createPinia)();
store.use(pinia_plugin_persistedstate_1.default);
exports.default = store;
