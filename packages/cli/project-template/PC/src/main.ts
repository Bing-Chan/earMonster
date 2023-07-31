import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import { store, key } from './store';
import '/@/assets/iconfont/iconfont.css';
import 'element-plus/dist/index.css';
import '/@/assets/scss/index.scss';
import other from '/@/utils/other';
import request from '/@/utils/request.ts';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import { YtoSecurity, YtoHttp, configYtoHttpConfig } from '@yto-security/vue3-sdk'; //导入 YtoSecurity
import router from './router/index';
import 'animate.css/animate.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle,faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import EarMonster from '@ear-monster/components';

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

let app = createApp(App);
configYtoHttpConfig({ baseURL: ENV.VITE_API_PATH, timeout: 30 * 1000 });

//注册全局组件
app.provide('http', YtoHttp);
app.provide('request', request);

library.add(faCircle);
library.add(faCheckSquare)

// 注册全局组件
other.elSvg(app);
other.elEmpty(app);
other.elDarwer(app);
other.elQuarter(app);
other.elCard(app);
other.elFormula(app);
other.elIntroStep(app);
// app.component('Codemirror', Codemirror);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(EarMonster)
// initFormula();
//初始化公式编辑器自定义模式

app.use(ElementPlus, { size: 'small', locale }).use(store, key).use(YtoSecurity, { baseUrl: ENV.VITE_API_PATH }).use(router).mount('#app');
