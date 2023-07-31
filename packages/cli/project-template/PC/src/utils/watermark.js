"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watermark = void 0;
const vue3_sdk_1 = require("@yto-security/vue3-sdk");
function setWatermark(str) {
    var id = '1.23452384164.123412416';
    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id));
    }
    //创建一个画布
    var can = document.createElement('canvas');
    //设置画布的长宽
    can.width = 300;
    can.height = 150;
    var cans = can.getContext('2d');
    //旋转角度
    cans.rotate((-15 * Math.PI) / 180);
    cans.font = '18px Vedana';
    //设置填充绘画的颜色、渐变或者模式
    cans.fillStyle = 'rgba(200, 200, 200, 0.25)';
    //设置文本内容的当前对齐方式
    cans.textAlign = 'left';
    //设置在绘制文本时使用的当前文本基线
    cans.textBaseline = 'Middle';
    //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
    cans.fillText(str, can.width / 8, can.height);
    var div = document.createElement('div');
    div.id = id;
    div.style.pointerEvents = 'none';
    div.style.top = '10px';
    div.style.left = '10px';
    div.style.position = 'fixed';
    div.style.zIndex = '100000';
    div.style.width = document.documentElement.clientWidth + 'px';
    div.style.height = document.documentElement.clientHeight + 'px';
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
    document.body.appendChild(div);
    return id;
}
//水印
// let noneMark = '"/definitionArea/userAreaPreview","/definitionArea/userArea","/definitionArea/adminArea"'; //无需水印
const watermark = (value) => {
    try {
        // if (!window.location.pathname || noneMark.includes(window.location.pathname)) return false; // 判断页面是否需要加水印
        if (!value) {
            const userName = vue3_sdk_1.SecurityUtils.userInfo.userName || '';
            const userCode = vue3_sdk_1.SecurityUtils.userInfo.userCode || '';
            //默认用户名称+工号
            value = `${userName}(${userCode})`;
        }
        var id = setWatermark(value);
        setInterval(function () {
            if (document.getElementById(id) === null) {
                id = setWatermark(value);
            }
        }, 500);
        window.onresize = function () {
            setWatermark(value);
        };
    }
    catch (ex) {
        //
    }
};
exports.watermark = watermark;
