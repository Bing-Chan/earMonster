"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formulaConfig = exports.quotalibraryInfo = exports.searchParamLibrary = exports.getParamLibraryList = exports.exportFail = exports.exportDemo = exports.uploadFile = exports.exportList = exports.quotaLibraryOn = exports.editQutotalLibrary = exports.deleteQuotalibrary = exports.addQuotalibrary = exports.searchQutoLibrary = exports.searchQutotalLibrary = exports.getIndicatorsList = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
function getIndicatorsList(params) {
    return vue3_sdk_1.YtoHttp.post('quotalibrary/list', params);
}
exports.getIndicatorsList = getIndicatorsList;
function searchQutotalLibrary(params) {
    return vue3_sdk_1.YtoHttp.post('quotalibrary/search', params);
}
exports.searchQutotalLibrary = searchQutotalLibrary;
function searchQutoLibrary(params) {
    return vue3_sdk_1.YtoHttp.post('quotalibrary/searchop', params);
}
exports.searchQutoLibrary = searchQutoLibrary;
function addQuotalibrary(params) {
    return vue3_sdk_1.YtoHttp.post('quotalibrary/add', params);
}
exports.addQuotalibrary = addQuotalibrary;
function deleteQuotalibrary(params) {
    return vue3_sdk_1.YtoHttp.post('quotalibrary/del', params);
}
exports.deleteQuotalibrary = deleteQuotalibrary;
function editQutotalLibrary(params) {
    return vue3_sdk_1.YtoHttp.post('quotalibrary/update', params);
}
exports.editQutotalLibrary = editQutotalLibrary;
function quotaLibraryOn(params) {
    return vue3_sdk_1.YtoHttp.post('quotalibrary/on', params);
}
exports.quotaLibraryOn = quotaLibraryOn;
function exportList(params) {
    return vue3_sdk_1.YtoHttp.post('quotalibrary/export', params, { responseType: 'blob' });
}
exports.exportList = exportList;
function uploadFile(params) {
    return vue3_sdk_1.YtoHttp.post('quotalibrary/import', params);
}
exports.uploadFile = uploadFile;
function exportDemo() {
    return vue3_sdk_1.YtoHttp.post('quotalibrary/exporttemplate', {}, { responseType: 'blob' });
}
exports.exportDemo = exportDemo;
function exportFail(params) {
    return vue3_sdk_1.YtoHttp.get('quotalibrary/importfail', params, { responseType: 'blob' });
}
exports.exportFail = exportFail;
function getParamLibraryList(params) {
    return vue3_sdk_1.YtoHttp.post('paramlibrary/list', params);
}
exports.getParamLibraryList = getParamLibraryList;
function searchParamLibrary(params) {
    return vue3_sdk_1.YtoHttp.post('paramlibrary/search', params);
}
exports.searchParamLibrary = searchParamLibrary;
function quotalibraryInfo(params) {
    return vue3_sdk_1.YtoHttp.post('quotalibrary/id', params);
}
exports.quotalibraryInfo = quotalibraryInfo;
//公式配置
function formulaConfig(params) {
    return vue3_sdk_1.YtoHttp.post('quotalibrary/formulaconfig', params);
}
exports.formulaConfig = formulaConfig;
