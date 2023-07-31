"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = void 0;
/**
 * 下载文件
 * @returns
 */
function downloadFile(res, filename = '') {
    if (!res) {
        return false;
    }
    console.log(res.headers);
    let url = window.URL.createObjectURL(new Blob([res]));
    let link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', filename == '' ? decodeURI(res.headers["content-disposition"].split("=")[1]) : filename);
    document.body.appendChild(link);
    link.click();
}
exports.downloadFile = downloadFile;
