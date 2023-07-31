"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddType = exports.getQlAnalysisList = exports.checkFormula = exports.getModelList = exports.modelSave = exports.modelDelete = exports.modelSort = exports.modelDetail = exports.modelAdd = exports.getModelInfo = exports.templateReview = exports.templateCopy = exports.templateDelete = exports.templateDisable = exports.templateUpdate = exports.templateAdd = exports.getTemplateList = exports.getTemplateInfo = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
//  获取模板详情
function getTemplateInfo(params) {
    return vue3_sdk_1.YtoHttp.get('template/detail', params);
}
exports.getTemplateInfo = getTemplateInfo;
//  获取模板列表
function getTemplateList(params) {
    return vue3_sdk_1.YtoHttp.post('template/page', params);
}
exports.getTemplateList = getTemplateList;
//  新增
function templateAdd(params) {
    return vue3_sdk_1.YtoHttp.post('template/insert', params);
}
exports.templateAdd = templateAdd;
//  更新
function templateUpdate(params) {
    return vue3_sdk_1.YtoHttp.put('template/update', params);
}
exports.templateUpdate = templateUpdate;
//  禁用
function templateDisable(params) {
    return vue3_sdk_1.YtoHttp.put(`template/enableOrDisable`, params);
}
exports.templateDisable = templateDisable;
//  删除
function templateDelete(params) {
    return vue3_sdk_1.YtoHttp.get('template/delete', params);
}
exports.templateDelete = templateDelete;
//  复制
function templateCopy(params) {
    return vue3_sdk_1.YtoHttp.put('template/copy', params);
}
exports.templateCopy = templateCopy;
//  预览
function templateReview(params) {
    return vue3_sdk_1.YtoHttp.get('template/preview', params);
}
exports.templateReview = templateReview;
/**
 * 获取模块详情
 * @param params {}
 * @returns {}
 */
function getModelInfo(params) {
    return new Promise((resolve) => {
        resolve({
            status: 0,
            message: 'success',
            data: {
                basic: {
                    name: params.name,
                    tag: params.tag,
                    desc: '测试描述',
                },
                zhibiao: [],
            },
        });
    });
}
exports.getModelInfo = getModelInfo;
//  新增模块
function modelAdd(params) {
    return vue3_sdk_1.YtoHttp.post(`templateModule/insert`, params);
}
exports.modelAdd = modelAdd;
//  模块详情
function modelDetail(params) {
    return vue3_sdk_1.YtoHttp.post(`templateModule/detail`, params);
}
exports.modelDetail = modelDetail;
// 模板保存
function modelSort(params) {
    return vue3_sdk_1.YtoHttp.post(`templateModule/sort`, params);
}
exports.modelSort = modelSort;
// 模板保存
function modelDelete(params) {
    return vue3_sdk_1.YtoHttp.get(`templateModule/delete`, params);
}
exports.modelDelete = modelDelete;
// 模板保存
function modelSave(params) {
    return vue3_sdk_1.YtoHttp.post(`templateModule/save`, params);
}
exports.modelSave = modelSave;
//  模块列表
function getModelList(params) {
    return vue3_sdk_1.YtoHttp.get(`templateModule/findList`, params);
}
exports.getModelList = getModelList;
//  校验公式
function checkFormula(params) {
    return vue3_sdk_1.YtoHttp.post(`ql/checkEx`, params);
}
exports.checkFormula = checkFormula;
//  返回解析值
function getQlAnalysisList(params) {
    return vue3_sdk_1.YtoHttp.post(`quotalibrary/getQlAnalysisList`, params);
}
exports.getQlAnalysisList = getQlAnalysisList;
//AddType
var AddType;
(function (AddType) {
    // eslint-disable-next-line no-unused-vars
    AddType["ADD_MODEL"] = "model";
    // eslint-disable-next-line no-unused-vars
    AddType["ADD_ZHIBIAO"] = "zhibiao";
    // eslint-disable-next-line no-unused-vars
    AddType["ADD_YIPIAOFOUJUE"] = "yipiao";
    // eslint-disable-next-line no-unused-vars
    AddType["ADD_JISUANGONGSHI"] = "jisuangongshi";
    // eslint-disable-next-line no-unused-vars
    AddType["ADD_YULAN"] = "yulan";
})(AddType = exports.AddType || (exports.AddType = {}));
