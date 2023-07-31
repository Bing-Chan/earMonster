"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 通用函数
const vue_clipboard3_1 = require("vue-clipboard3");
const element_plus_1 = require("element-plus");
const formatTime_1 = require("/@/utils/formatTime");
const vue_i18n_1 = require("vue-i18n");
function default_1() {
    const { t } = (0, vue_i18n_1.useI18n)();
    const { toClipboard } = (0, vue_clipboard3_1.default)();
    //百分比格式化
    const percentFormat = (row, column, cellValue) => {
        return cellValue ? `${cellValue}%` : '-';
    };
    //列表日期时间格式化
    const dateFormatYMD = (row, column, cellValue) => {
        if (!cellValue)
            return '-';
        return (0, formatTime_1.formatDate)(new Date(cellValue), 'YYYY-mm-dd');
    };
    //列表日期时间格式化
    const dateFormatYMDHMS = (row, column, cellValue) => {
        if (!cellValue)
            return '-';
        return (0, formatTime_1.formatDate)(new Date(cellValue), 'YYYY-mm-dd HH:MM:SS');
    };
    //列表日期时间格式化
    const dateFormatHMS = (row, column, cellValue) => {
        if (!cellValue)
            return '-';
        let time = 0;
        if (typeof row === 'number')
            time = row;
        if (typeof cellValue === 'number')
            time = cellValue;
        return (0, formatTime_1.formatDate)(new Date(time * 1000), 'HH:MM:SS');
    };
    // 小数格式化
    const scaleFormat = (value = 0, scale = 4) => {
        return Number.parseFloat(value).toFixed(scale);
    };
    // 小数格式化
    const scale2Format = (value = 0) => {
        return Number.parseFloat(value).toFixed(2);
    };
    // 点击复制文本
    const copyText = (text) => {
        return new Promise((resolve, reject) => {
            try {
                //复制
                toClipboard(text);
                //下面可以设置复制成功的提示框等操作
                element_plus_1.ElMessage.success(t('message.layout.copyTextSuccess'));
                resolve(text);
            }
            catch (e) {
                //复制失败
                element_plus_1.ElMessage.error(t('message.layout.copyTextError'));
                reject(e);
            }
        });
    };
    return {
        percentFormat,
        dateFormatYMD,
        dateFormatYMDHMS,
        dateFormatHMS,
        scaleFormat,
        scale2Format,
        copyText,
    };
}
exports.default = default_1;
