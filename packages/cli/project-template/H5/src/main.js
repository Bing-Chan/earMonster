"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const App_vue_1 = require("./App.vue");
const i18n_1 = require("/@/i18n");
const router_1 = require("/@/router");
const store_1 = require("/@/store");
require("./assets/font/iconfont.css");
require("./assets/app.css");
require("./assets/main.scss");
const app = (0, vue_1.createApp)(App_vue_1.default);
// 路由
app.use(router_1.default);
// 国际化
app.use(i18n_1.i18n);
// 状态管理
app.use(store_1.default);
app.mount('#app');
