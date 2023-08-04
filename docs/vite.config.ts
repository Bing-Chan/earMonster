import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts'
import Inspect from 'vite-plugin-inspect'

const path = require('path')

export default defineConfig({
	plugins: [sassDts(), Inspect()],
	resolve: {
		alias: [
			{
				find: '@ear-monster/components',
				replacement: path.resolve(__dirname, '../packages/components'),
			},
			{
				find: '@ear-monster/use',
				replacement: path.resolve(__dirname, '../packages/use'),
			},
		],
	},
	server: {
		fs: {
			strict: false,
			allow: [],
		},
	},
	optimizeDeps: {
		include: ['vue', 'markdown-it', '@vueuse/core'],
	},
})
