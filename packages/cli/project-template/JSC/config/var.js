/*
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2020-09-18 14:56:07
 * @Date: 2020-09-18 13:49:59
 */

const v = Date.now();

module.exports = {
    "test": {
        "yto-package-js": "//10.130.36.205:8095/jscPackageApp/yto-package.js?v" + v,
        "yto-package-css": "//10.130.36.205:8095/jscPackageApp/yto-package.css",
        "report-api": "//10.130.11.148:8090/api-base/base/apiForNative/operationMonitor/record"
    },
    "production": {
        "yto-package-js": "//jscapp.yto56.com.cn:8081/jscPackageApp/yto-package.js?v" + v,
        "yto-package-css": "//jscapp.yto56.com.cn:8081/jscPackageApp/yto-package.css",
        "report-api": "//jscapp-inter.yto56.com.cn:8080/api-base/base/apiForNative/operationMonitor/record"
    }
}