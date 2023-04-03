// @ts-ignore
import request_cb from '@request_cb'
import DefaultTheme from 'vitepress/dist/client/theme-default'
import vpDemo from '../components/vp-demo.vue'

import './doc.scss'

export default {
	...DefaultTheme,
	logo: '/logo.png',
	enhanceApp: ({ app }) => {
		// app.use(request_cb)
		app.use(request_cb)
		app.component('vp-demo', vpDemo)
	},
}
