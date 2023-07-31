"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextLoading = void 0;
const vue_1 = require("vue");
const loading_scss_1 = require("/@/theme/loading.scss");
/**
 * 页面全局 Loading
 * @method setCss 载入 css
 * @method start 创建 loading
 * @method done 移除 loading
 */
exports.NextLoading = {
    // 载入 css
    setCss: () => {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = loading_scss_1.default;
        link.crossOrigin = 'anonymous';
        document.getElementsByTagName('head')[0].appendChild(link);
    },
    // 创建 loading
    start: () => {
        const bodys = document.body;
        const div = document.createElement('div');
        div.setAttribute('class', 'loading-next');
        const htmls = `
			<div class="loading-next-box">
			<div class="loading-next-box-warp">
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
			</div>
		</div>
		`;
        div.innerHTML = htmls;
        bodys.insertBefore(div, bodys.childNodes[0]);
        window.nextLoading = true;
    },
    // 移除 loading
    done: () => {
        (0, vue_1.nextTick)(() => {
            setTimeout(() => {
                var _a;
                window.nextLoading = false;
                const el = document.querySelector('.loading-next');
                el && ((_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el));
            }, 1000);
        });
    },
};
