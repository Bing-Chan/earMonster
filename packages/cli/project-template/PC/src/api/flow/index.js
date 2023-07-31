"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeDelete = exports.nodeSort = exports.nodeUpdate = exports.nodeAdd = exports.flowNodeInfo = exports.getNodeList = exports.getTempListByFlowId = exports.flowDisable = exports.flowInfo = exports.flowUpdate = exports.flowAdd = exports.flowDelete = exports.releaseFlow = exports.getFlowList = exports.getFlowNode = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
/**
 * @description liebiao
 * @returns
 */
function getFlowNode(params) {
    return vue3_sdk_1.YtoHttp.get('flowNode/initFlowNode', params);
}
exports.getFlowNode = getFlowNode;
/**
 * @description liebiao
 * @returns
 */
function getFlowList(params) {
    return vue3_sdk_1.YtoHttp.post('flow/list', params);
}
exports.getFlowList = getFlowList;
/**
 * @description 发布
 * @returns
 */
function releaseFlow(params) {
    return vue3_sdk_1.YtoHttp.post('flow/version/add', params);
}
exports.releaseFlow = releaseFlow;
/**
 * @description 删除
 * @returns
 */
function flowDelete(params) {
    return vue3_sdk_1.YtoHttp.post('flow/delete', params);
}
exports.flowDelete = flowDelete;
/**
 * @description liebiao
 * @returns
 */
function flowAdd(params) {
    return vue3_sdk_1.YtoHttp.post('flow/add', params);
}
exports.flowAdd = flowAdd;
/**
 * @description xiugai
 * @returns
 */
function flowUpdate(params) {
    return vue3_sdk_1.YtoHttp.post('flow/update', params);
}
exports.flowUpdate = flowUpdate;
/**
 * @description xiugai
 * @returns
 */
function flowInfo(params) {
    return vue3_sdk_1.YtoHttp.post('flow/display', params);
}
exports.flowInfo = flowInfo;
/**
 * @description 启用
 * @returns
 */
function flowDisable(params) {
    return vue3_sdk_1.YtoHttp.post('flow/disable', params);
}
exports.flowDisable = flowDisable;
/**
 * @description 查询模板
 * @returns
 */
function getTempListByFlowId(params) {
    return vue3_sdk_1.YtoHttp.get('flow/listTemplateByFlowId', params);
}
exports.getTempListByFlowId = getTempListByFlowId;
/**
 * @description  获取节点列表
 * @returns
 */
function getNodeList(params) {
    return vue3_sdk_1.YtoHttp.post('flowNode/listFlowNodeByFlowId', params);
}
exports.getNodeList = getNodeList;
/**
 * @description  获取节点
 * @returns
 */
function flowNodeInfo(params) {
    return vue3_sdk_1.YtoHttp.post('flowNode/display', params);
}
exports.flowNodeInfo = flowNodeInfo;
/**
 * @description  新增
 * @returns
 */
function nodeAdd(params) {
    return vue3_sdk_1.YtoHttp.post('flowNode/add', params);
}
exports.nodeAdd = nodeAdd;
/**
 * @description  修改
 * @returns
 */
function nodeUpdate(params) {
    return vue3_sdk_1.YtoHttp.post('flowNode/update', params);
}
exports.nodeUpdate = nodeUpdate;
/**
 * @description  排序
 * @returns
 */
function nodeSort(params) {
    return vue3_sdk_1.YtoHttp.post('flowNode/sort', params);
}
exports.nodeSort = nodeSort;
/**
 * @description  删除
 * @returns
 */
function nodeDelete(params) {
    return vue3_sdk_1.YtoHttp.post('flowNode/delete', params);
}
exports.nodeDelete = nodeDelete;
