"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEndFlagByUp = exports.toEndFlagCode = exports.toBeginFlagCode = exports.toEndFlag = exports.toBeginFlag = exports.getQueryVariable = void 0;
const type_1 = require("./type");
function getQueryVariable(url, variable) {
    var query = url.split('?')[1];
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}
exports.getQueryVariable = getQueryVariable;
const toBeginFlag = (begin) => {
    if (begin == type_1.SCOPE_TYPE.closeBegin.code) {
        return type_1.SCOPE_TYPE.closeBegin.name;
    }
    return type_1.SCOPE_TYPE.openBegin.name;
};
exports.toBeginFlag = toBeginFlag;
const toEndFlag = (end) => {
    if (end == type_1.SCOPE_TYPE.closeEnd.code) {
        return type_1.SCOPE_TYPE.closeEnd.name;
    }
    return type_1.SCOPE_TYPE.openEnd.name;
};
exports.toEndFlag = toEndFlag;
const toBeginFlagCode = (begin) => {
    if (begin == type_1.SCOPE_TYPE.closeBegin.name) {
        return type_1.SCOPE_TYPE.closeBegin.code;
    }
    return type_1.SCOPE_TYPE.openBegin.code;
};
exports.toBeginFlagCode = toBeginFlagCode;
const toEndFlagCode = (end) => {
    if (end == type_1.SCOPE_TYPE.closeEnd.name) {
        return type_1.SCOPE_TYPE.closeEnd.code;
    }
    return type_1.SCOPE_TYPE.openEnd.code;
};
exports.toEndFlagCode = toEndFlagCode;
const toEndFlagByUp = (begin) => {
    // debugger
    if (begin == type_1.SCOPE_TYPE.closeBegin.code) {
        return type_1.SCOPE_TYPE.openEnd.code;
    }
    return type_1.SCOPE_TYPE.closeEnd.code;
};
exports.toEndFlagByUp = toEndFlagByUp;
