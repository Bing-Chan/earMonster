// @ts-ignore
import earMonster from '@ear-monster/components'
import DefaultTheme from 'vitepress/dist/client/theme-default'
import vpDemo from '../components/vp-demo.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './doc.scss'

export default {
	...DefaultTheme,
	logo: '/logo.png',
	enhanceApp: ({ app }) => {
		app.use(ElementPlus)
		app.use(earMonster)
		app.component('vp-demo', vpDemo)
	},
}
