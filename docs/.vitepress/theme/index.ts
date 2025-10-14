// @ts-ignore
import earMonster from '@ear-monster/components'
import DefaultTheme from 'vitepress/dist/client/theme-default'
import vpDemo from '../components/vp-demo.vue'
import allDemo from '../components/all-demo.vue'
import level3Demo from '../components/level3-demo.vue'
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
		app.component('all-demo', allDemo)
		app.component('level3-demo', level3Demo)
	},
}
