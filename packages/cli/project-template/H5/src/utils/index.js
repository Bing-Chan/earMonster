"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutateState = exports.typeCheck = void 0;
function typeCheck(param) {
    return Object.prototype.toString.call(param);
}
exports.typeCheck = typeCheck;
/**
 * 批量修改stage
 */
function mutateState(state, payload) {
    if (typeCheck(state) === '[object Object]' && typeCheck(payload) === '[object Object]') {
        for (const key in payload) {
            state[key] = payload[key];
        }
    }
    else {
        console.error('expected plain Object');
    }
}
exports.mutateState = mutateState;
