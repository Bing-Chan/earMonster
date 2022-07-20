// @ts-ignore
import request_cb from '@request_cb'
import DefaultTheme from 'vitepress/dist/client/theme-default'
import Layout from './Layout.vue'
import './style/index.scss'
import './style/code.scss'

export default {
	...DefaultTheme,
	Layout,
	enhanceApp: ({ app }) => {
		app.use(request_cb)
	},
}
