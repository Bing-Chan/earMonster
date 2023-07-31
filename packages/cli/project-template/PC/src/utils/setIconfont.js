"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setJsCdn = exports.setCssCdn = void 0;
// 字体图标 url
const cssCdnUrlList = [
    '//at.alicdn.com/t/font_2298093_y6u00apwst.css',
    '//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
];
// 第三方 js url
const jsCdnUrlList = [];
// 动态批量设置字体图标
function setCssCdn() {
    if (cssCdnUrlList.length <= 0)
        return false;
    cssCdnUrlList.map((v) => {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = v;
        link.crossOrigin = 'anonymous';
        document.getElementsByTagName('head')[0].appendChild(link);
    });
}
exports.setCssCdn = setCssCdn;
// 动态批量设置第三方js
function setJsCdn() {
    if (jsCdnUrlList.length <= 0)
        return false;
    jsCdnUrlList.map((v) => {
        let link = document.createElement('script');
        link.src = v;
        document.body.appendChild(link);
    });
}
exports.setJsCdn = setJsCdn;
/**
 * 批量设置字体图标、动态js
 * @method cssCdn 动态批量设置字体图标
 * @method jsCdn 动态批量设置第三方js
 */
const setIntroduction = {
    // 设置css
    cssCdn: () => {
        setCssCdn();
    },
    // 设置js
    jsCdn: () => {
        setJsCdn();
    },
};
// 导出函数方法
exports.default = setIntroduction;
