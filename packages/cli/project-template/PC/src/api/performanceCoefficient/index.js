"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPage = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
function getPage(params) {
    return vue3_sdk_1.YtoHttp.post('coefficient/page', params);
}
exports.getPage = getPage;
