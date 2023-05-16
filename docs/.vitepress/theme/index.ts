// @ts-ignore
import request_cb from '@request_cb/components'
import DefaultTheme from 'vitepress/dist/client/theme-default'
import vpDemo from '../components/vp-demo.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './doc.scss'

export default {
	...DefaultTheme,
	logo: '/logo.png',
	enhanceApp: ({ app }) => {
		console.log(request_cb, 'c')
		app.use(ElementPlus)
		app.use(request_cb)
		app.component('vp-demo', vpDemo)
	},
}
