import { defineConfig } from 'vite'
// import { createVitePlugins } from './build/vite/plugins'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

module.exports = {
	plugins: [vue()],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: resolve('demo'),
			},
			{
				find: '~',
				replacement: resolve('packages'),
			},
		],
	},
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				//生产环境时移除console
				drop_console: true,
				drop_debugger: true,
			},
		},
	},
	server: {
		port: 9000,
	},
	chainWebpack: config => {
		config.resolve.alias.set('@ear-monster', resolve(__dirname, 'packages/components'))
	},
}
