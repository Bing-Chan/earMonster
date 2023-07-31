"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePrice = exports.modifyPriority = exports.publishPrice = exports.updatePrice = exports.addPrice = exports.checkPrice = exports.getSectionList = exports.getPage = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
function getPage(params) {
    return vue3_sdk_1.YtoHttp.post('section/price/page', params);
}
exports.getPage = getPage;
function getSectionList(params) {
    return vue3_sdk_1.YtoHttp.post('section/price/detail/list', params);
}
exports.getSectionList = getSectionList;
function checkPrice(params) {
    return vue3_sdk_1.YtoHttp.post('/section/price/check', params);
}
exports.checkPrice = checkPrice;
function addPrice(params) {
    return vue3_sdk_1.YtoHttp.post('/section/price/save', params);
}
exports.addPrice = addPrice;
function updatePrice(params) {
    return vue3_sdk_1.YtoHttp.post('/section/price/edit', params);
}
exports.updatePrice = updatePrice;
function publishPrice(params) {
    return vue3_sdk_1.YtoHttp.post('/section/price/add', params);
}
exports.publishPrice = publishPrice;
function modifyPriority(params) {
    return vue3_sdk_1.YtoHttp.post('section/price/updatePriority', params);
}
exports.modifyPriority = modifyPriority;
function deletePrice(params) {
    return vue3_sdk_1.YtoHttp.post('section/price/delete', params);
}
exports.deletePrice = deletePrice;
