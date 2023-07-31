"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLang = exports.i18n = exports.loadLang = void 0;
const vue_i18n_1 = require("vue-i18n");
function loadLang() {
    const modules = import.meta.glob('./lang/*.ts', { eager: true });
    const langs = {};
    for (const path in modules) {
        const name = path.replace(/(\.\/lang\/|\.ts)/g, '');
        langs[name] = modules[path].lang;
    }
    return langs;
}
exports.loadLang = loadLang;
exports.i18n = (0, vue_i18n_1.createI18n)({
    // globalInjection: true,
    legacy: false,
    locale: 'zh-cn',
    fallbackLocale: 'zh-cn',
    messages: loadLang(),
});
function setLang(locale) {
    if (locale) {
        localStorage.setItem('lang', locale);
    }
    exports.i18n.global.locale.value = locale || localStorage.getItem('lang') || '';
}
exports.setLang = setLang;
