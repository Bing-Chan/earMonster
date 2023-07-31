"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePageHead = void 0;
const dd = require("dingtalk-jsapi");
const vue_router_1 = require("vue-router");
function usePageHead() {
    const route = (0, vue_router_1.useRoute)();
    onBeforeMount(() => {
        const isDingTalk = !('notInDingTalk' === dd.env.platform);
        if (isDingTalk) {
            // 设置标题
            dd.biz.navigation.setTitle({
                title: route.meta.title,
                onSuccess: function (result) { },
                onFail: function (err) { },
            });
            if (route.meta.isHelp) {
                dd.biz.navigation.setIcon({
                    showIcon: true,
                    iconIndex: 1,
                    onSuccess: function (result) { },
                    onFail: function (err) {
                        //jsapi调用失败将会回调此函数
                    },
                });
            }
        }
    });
}
exports.usePageHead = usePageHead;
