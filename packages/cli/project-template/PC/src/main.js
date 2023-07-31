"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const App_vue_1 = require("./App.vue");
const element_plus_1 = require("element-plus");
const store_1 = require("./store");
require("/@/assets/iconfont/iconfont.css");
require("element-plus/dist/index.css");
require("/@/assets/scss/index.scss");
const other_1 = require("/@/utils/other");
const request_ts_1 = require("/@/utils/request.ts");
const zh_cn_1 = require("element-plus/lib/locale/lang/zh-cn");
const vue3_sdk_1 = require("@yto-security/vue3-sdk"); //导入 YtoSecurity
const index_1 = require("./router/index");
require("animate.css/animate.min.css");
const fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const vue_fontawesome_1 = require("@fortawesome/vue-fontawesome");
const components_1 = require("@ear-monster/components");
// import _CodeMirror  from 'codemirror';
// _CodeMirror.defineSimpleMode('mymode', () => {
// 	return {
// 		token(stream, state) {
// 			if (stream.match('const')) {
// 				return 'style1';
// 			} else if (stream.match('bbb')) {
// 				return 'style2';
// 			} else {
// 				stream.next();
// 				return null;
// 			}
// 		},
// 	};
// });
const ENV = import.meta.env;
let app = (0, vue_1.createApp)(App_vue_1.default);
(0, vue3_sdk_1.configYtoHttpConfig)({ baseURL: ENV.VITE_API_PATH, timeout: 30 * 1000 });
//注册全局组件
app.provide('http', vue3_sdk_1.YtoHttp);
app.provide('request', request_ts_1.default);
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faCircle);
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faCheckSquare);
// 注册全局组件
other_1.default.elSvg(app);
other_1.default.elEmpty(app);
other_1.default.elDarwer(app);
other_1.default.elQuarter(app);
other_1.default.elCard(app);
other_1.default.elFormula(app);
other_1.default.elIntroStep(app);
// app.component('Codemirror', Codemirror);
app.component('font-awesome-icon', vue_fontawesome_1.FontAwesomeIcon);
app.use(components_1.default);
// initFormula();
//初始化公式编辑器自定义模式
app.use(element_plus_1.default, { size: 'small', locale: zh_cn_1.default }).use(store_1.store, store_1.key).use(vue3_sdk_1.YtoSecurity, { baseUrl: ENV.VITE_API_PATH }).use(index_1.default).mount('#app');
