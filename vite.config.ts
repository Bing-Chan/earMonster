import { defineConfig } from 'vite'
import { createVitePlugins } from './build/vite/plugins';
import { resolve } from 'path'

module.exports = {
	assetsDir: './',
	plugins: [ vue()],
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
