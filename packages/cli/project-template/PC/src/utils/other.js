"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotArr = exports.isEmpty = exports.getQuanZhong = exports.getState = exports.getTagStyle = exports.getBase6File = exports.formRulesValidate = exports.getExtName = exports.isFile = exports.isImage = exports.toDatePicker = exports.toDateTimePicker = exports.getSimpleCheckedNodes = exports.clearHtml = exports.getMaxLengthStr = exports.jumpOAUrl = exports.getOssfileUrl = exports.getXCTabType = exports.getQueryType = exports.handleEmpty = exports.isMobile = exports.deepClone = exports.lazyImg = exports.elIntroStep = exports.elFormula = exports.elDarwer = exports.elCard = exports.elQuarter = exports.elEmpty = exports.elSvg = void 0;
const vue_1 = require("vue");
const svg = require("@element-plus/icons");
const index_vue_1 = require("/@/components/SvgIcon/index.vue");
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
const dayjs_1 = require("dayjs");
const type_ts_1 = require("./type.ts");
const empty_vue_1 = require("/@/components/empty.vue");
const quarter_vue_1 = require("/@/components/quarter.vue");
const index_vue_2 = require("/@/components/Formula/index.vue");
const Darwer_vue_1 = require("/@/components/Darwer.vue");
const reportCard_vue_1 = require("/@/components/reportCard.vue");
const index_vue_3 = require("/@/components/intro-step/index.vue");
/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
function elSvg(app) {
    const icons = svg;
    for (const i in icons) {
        app.component(`ele-${icons[i].name}`, icons[i]);
    }
    app.component('SvgIcon', index_vue_1.default);
}
exports.elSvg = elSvg;
/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
function elEmpty(app) {
    app.component('SysEmpty', empty_vue_1.default);
}
exports.elEmpty = elEmpty;
/**
 * 导出全局注册 element plus 季度插件
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
function elQuarter(app) {
    app.component('quarter', quarter_vue_1.default);
}
exports.elQuarter = elQuarter;
/**
 * 导出全局注册 element plus 季度插件
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
function elCard(app) {
    app.component('reportCard', reportCard_vue_1.default);
}
exports.elCard = elCard;
/**
 * 导出全局注册 element plus 抽屉
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
function elDarwer(app) {
    app.component('darwer', Darwer_vue_1.default);
}
exports.elDarwer = elDarwer;
/**
 * 导出全局注册 element plus 公式插件
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
function elFormula(app) {
    app.component('formula', index_vue_2.default);
}
exports.elFormula = elFormula;
/**
 * 新手引导页
 * @param app vue 实例
 * @description  复制vue3-intro-step  后修改
 */
function elIntroStep(app) {
    app.component('introStep', index_vue_3.default);
}
exports.elIntroStep = elIntroStep;
/**
 * 图片懒加载
 * @param el dom 目标元素
 * @param arr 列表数据
 * @description data-xxx 属性用于存储页面或应用程序的私有自定义数据
 */
const lazyImg = (el, arr) => {
    const io = new IntersectionObserver((res) => {
        res.forEach((v) => {
            if (v.isIntersecting) {
                const { img, key } = v.target.dataset;
                v.target.src = img;
                v.target.onload = () => {
                    io.unobserve(v.target);
                    arr[key]['loading'] = false;
                };
            }
        });
    });
    (0, vue_1.nextTick)(() => {
        document.querySelectorAll(el).forEach((img) => io.observe(img));
    });
};
exports.lazyImg = lazyImg;
/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
 */
function deepClone(obj) {
    let newObj;
    try {
        newObj = obj.push ? [] : {};
    }
    catch (error) {
        newObj = {};
    }
    for (let attr in obj) {
        if (typeof obj[attr] === 'object') {
            newObj[attr] = deepClone(obj[attr]);
        }
        else {
            newObj[attr] = obj[attr];
        }
    }
    return newObj;
}
exports.deepClone = deepClone;
/**
 * 判断是否是移动端
 */
function isMobile() {
    if (navigator.userAgent.match(/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i)) {
        return true;
    }
    else {
        return false;
    }
}
exports.isMobile = isMobile;
/**
 * 判断数组对象中所有属性是否为空，为空则删除当前行对象
 * @param list 数组对象
 * @returns 删除空值后的数组对象
 */
function handleEmpty(list) {
    const arr = [];
    for (const i in list) {
        const d = [];
        for (const j in list[i]) {
            d.push(list[i][j]);
        }
        const leng = d.filter((item) => item === '').length;
        if (leng !== d.length) {
            arr.push(list[i]);
        }
    }
    return arr;
}
exports.handleEmpty = handleEmpty;
function getQueryType(status) {
    let str = '';
    switch (status) {
        case 1:
            str = 'pendtrial';
            break;
        case 2:
            str = 'reviewed';
            break;
        case 3:
            str = 'unread';
            break;
        case 4:
            str = 'read';
            break;
    }
    return str;
}
exports.getQueryType = getQueryType;
function getXCTabType(queryType, { flowStatus, tabStatus, agencyType }) {
    // queryType合法值
    //      0: '待审批',
    //      1: '已审批',
    //      2: '结束',
    //      3: '废弃',
    //      4: '驳回',
    //      5: '草稿',
    //      6: '待阅',
    //      7: '已阅',
    //      8: '撤回',
    //      9: '已反馈'
    // tabstatus  审批人 1 待审  2 已审 3 待阅 4 已阅
    //            申请人 5 申请  6 草稿 3 待阅 4 已阅
    const xcTabStatusMap = {
        // 待办申请单
        create: 'create',
        // 我发起的申请
        myhistory: 'myhistory',
        // 我的草稿单
        drafts: 'drafts',
        // 我的审批申请
        history: 'history',
    };
    var type = {
        // 待审
        pendtrial: xcTabStatusMap.create,
        // 已审
        reviewed: xcTabStatusMap.history,
        // 申请
        apply: xcTabStatusMap.create,
        // 草稿
        draft: xcTabStatusMap.drafts,
        // 全部
        all() {
            switch (+agencyType) {
                case 1:
                    // 审批
                    if (+flowStatus === 0 && +tabStatus === 1) {
                        //  待审（流程状态）- 待审(筛选状态)
                        return xcTabStatusMap.create;
                    }
                    else {
                        return xcTabStatusMap.history;
                    }
                case 2:
                    // 申请
                    return {
                        0: xcTabStatusMap.create,
                        2: xcTabStatusMap.myhistory,
                        4: xcTabStatusMap.myhistory,
                        5: xcTabStatusMap.drafts,
                    }[+flowStatus];
                default:
                    return '';
            }
        },
    }[queryType] || '';
    return typeof type === 'string' ? type : type();
}
exports.getXCTabType = getXCTabType;
function getOssfileUrl(filePath) {
    // 获取auth 、usercode
    return `hrplatform/file/downLoadGetUrlAuth?filePath=${filePath}&authorization=${vue3_sdk_1.SecurityUtils.authorization}&&userCode=${vue3_sdk_1.SecurityUtils.userInfo.userCode}`;
}
exports.getOssfileUrl = getOssfileUrl;
function jumpOAUrl(url, token) {
    // 获取auth 、usercode
    return `${import.meta.env.VITE_OA_URL}&km_url=${url}&token=${token}`;
}
exports.jumpOAUrl = jumpOAUrl;
function getMaxLengthStr(str, maxLength = 200) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength - 1) + '...';
    }
    return str;
}
exports.getMaxLengthStr = getMaxLengthStr;
function clearHtml(str) {
    var median = str.replace(/<\/?.+?>/g, '');
    return median.replace(/ /g, '').replace(/&nbsp;/g, '');
}
exports.clearHtml = clearHtml;
function getSimpleCheckedNodes(data) {
    let checkedNodes = [];
    const traverse = function (node) {
        const childNodes = node.root ? node.root.childNodes : node.childNodes;
        childNodes.forEach((child) => {
            if (child.checked) {
                checkedNodes.push(child.data);
            }
            if (child.indeterminate) {
                traverse(child);
            }
        });
    };
    traverse(data);
    return checkedNodes;
}
exports.getSimpleCheckedNodes = getSimpleCheckedNodes;
function toDateTimePicker(date, type) {
    if (date && date.length > 0 && date[0] != '') {
        switch (type) {
            case type_ts_1.DateEnum.START:
                return (0, dayjs_1.default)(date[0]).format('YYYY-MM-DD 00:00:00');
            case type_ts_1.DateEnum.END:
                return (0, dayjs_1.default)(date[1]).format('YYYY-MM-DD 23:59:59');
        }
    }
    return '';
}
exports.toDateTimePicker = toDateTimePicker;
function toDatePicker(date, type, format = 'YYYY-MM-DD') {
    if (date && date.length > 0 && date[0] != '') {
        switch (type) {
            case type_ts_1.DateEnum.START:
                return (0, dayjs_1.default)(date[0]).format(format);
            case type_ts_1.DateEnum.END:
                return (0, dayjs_1.default)(date[1]).format(format);
        }
    }
    return '';
}
exports.toDatePicker = toDatePicker;
function isImage(filename) {
    let ext = getExtName(filename);
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext.toLocaleLowerCase())) {
        return true;
    }
    return false;
}
exports.isImage = isImage;
function isFile(filename) {
    let ext = getExtName(filename);
    if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext.toLocaleLowerCase())) {
        return true;
    }
    return false;
}
exports.isFile = isFile;
function getExtName(filename) {
    if (filename == '') {
        return '';
    }
    let arr = filename.split('.');
    return arr[arr.length - 1];
}
exports.getExtName = getExtName;
// 表单组件验证
const formRulesValidate = (pageRef) => {
    return new Promise((resolve) => {
        if (!pageRef) {
            resolve(true);
        }
        pageRef.validate((valid) => {
            if (valid)
                resolve(valid);
        });
    });
};
exports.formRulesValidate = formRulesValidate;
/**
 * 统一批量导出
 * @method elSvg 导出全局注册 element plus svg 图标
 * @method useTitle 设置浏览器标题国际化
 * @method lazyImg 图片懒加载
 * @method globalComponentSize element plus 全局组件大小
 * @method deepClone 对象深克隆
 * @method isMobile 判断是否是移动端
 * @method handleEmpty 判断数组对象中所有属性是否为空，为空则删除当前行对象
 */
const other = {
    elSvg: (app) => {
        elSvg(app);
    },
    deepClone: (obj) => {
        deepClone(obj);
    },
    elEmpty: (app) => {
        elEmpty(app);
    },
    elDarwer: (app) => {
        elDarwer(app);
    },
    elQuarter: (app) => {
        elQuarter(app);
    },
    elCard: (app) => {
        elCard(app);
    },
    elFormula: (app) => {
        elFormula(app);
    },
    elIntroStep: (app) => {
        elIntroStep(app);
    },
    isMobile: () => {
        return isMobile();
    },
    handleEmpty: (list) => {
        return handleEmpty(list);
    },
};
/***
 * 转换base64
 */
function getBase6File(str) {
    return 'data:image/Jpeg;base64,' + str;
}
exports.getBase6File = getBase6File;
/***
 * 转换base64
 */
function getTagStyle(val) {
    switch (val) {
        case 'assessment':
            return 'success';
        case 'reject':
            return 'danger';
        case 'result':
            return 'info';
    }
}
exports.getTagStyle = getTagStyle;
/***
 * 状态
 */
function getState(val) {
    switch (val) {
        case 1:
            return '启用';
        case 0:
            return '禁用';
    }
}
exports.getState = getState;
/***
 * 算分方式
 */
function getQuanZhong(val) {
    switch (val) {
        case 1:
            return '权重';
        case 2:
            return '非权重';
    }
}
exports.getQuanZhong = getQuanZhong;
/***
 * 算分方式
 */
function isEmpty(val) {
    if (val == null || val == 'undefined') {
        return '';
    }
    return val;
}
exports.isEmpty = isEmpty;
/***
 * 取差集
 */
function getNotArr(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    // 然后分别取出set1中存在，set2中不存在 和 set2中存在，set1中不存在的值
    const newArr1 = [...set1].filter((item) => {
        return !set2.has(item);
    });
    const newArr2 = [...set2].filter((item) => {
        return !set1.has(item);
    });
    // 再将得到的两个新数组合并，就能得到差集了
    return [...newArr1, ...newArr2];
}
exports.getNotArr = getNotArr;
// 统一批量导出
exports.default = other;
