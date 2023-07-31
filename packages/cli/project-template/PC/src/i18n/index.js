"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18n = void 0;
const vue_i18n_1 = require("vue-i18n");
const zh_cn_1 = require("element-plus/lib/locale/lang/zh-cn");
const en_1 = require("element-plus/lib/locale/lang/en");
const zh_tw_1 = require("element-plus/lib/locale/lang/zh-tw");
const index_1 = require("/@/store/index");
const zh_cn_2 = require("/@/i18n/lang/zh-cn");
const en_2 = require("/@/i18n/lang/en");
const zh_tw_2 = require("/@/i18n/lang/zh-tw");
const zh_cn_3 = require("/@/i18n/pages/home/zh-cn");
const en_3 = require("/@/i18n/pages/home/en");
const zh_tw_3 = require("/@/i18n/pages/home/zh-tw");
const zh_cn_4 = require("/@/i18n/pages/login/zh-cn");
const en_4 = require("/@/i18n/pages/login/en");
const zh_tw_4 = require("/@/i18n/pages/login/zh-tw");
const zh_cn_5 = require("/@/i18n/pages/formI18n/zh-cn");
const en_5 = require("/@/i18n/pages/formI18n/en");
const zh_tw_5 = require("/@/i18n/pages/formI18n/zh-tw");
// 定义语言国际化内容
/**
 * 说明：
 * /src/i18n/lang 下的 ts 为框架的国际化内容
 * /src/i18n/pages 下的 ts 为各界面的国际化内容
 */
const messages = {
    [zh_cn_1.default.name]: Object.assign(Object.assign({}, zh_cn_1.default), { message: Object.assign(Object.assign(Object.assign(Object.assign({}, zh_cn_2.default), zh_cn_3.default), zh_cn_4.default), zh_cn_5.default) }),
    [en_1.default.name]: Object.assign(Object.assign({}, en_1.default), { message: Object.assign(Object.assign(Object.assign(Object.assign({}, en_2.default), en_3.default), en_4.default), en_5.default) }),
    [zh_tw_1.default.name]: Object.assign(Object.assign({}, zh_tw_1.default), { message: Object.assign(Object.assign(Object.assign(Object.assign({}, zh_tw_2.default), zh_tw_3.default), zh_tw_4.default), zh_tw_5.default) }),
};
// 导出语言国际化
exports.i18n = (0, vue_i18n_1.createI18n)({
    locale: index_1.store.state.themeConfig.themeConfig.globalI18n,
    fallbackLocale: zh_cn_1.default.name,
    messages,
});
