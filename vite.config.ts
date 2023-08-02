import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { resolve } from 'path'

module.exports = {
	assetsDir: './',
	plugins: [DefineOptions(), vue()],
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
	chainWebpack: config => {
		config.resolve.alias.set('@ear-monster', resolve(__dirname, 'packages/components'))
	},
}
