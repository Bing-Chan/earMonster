import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts'
import Inspect from 'vite-plugin-inspect'

const path = require('path')

export default defineConfig({
	plugins: [sassDts(), Inspect()],
	resolve: {
		alias: {
			'@ear-monster/components': path.resolve(__dirname, '../packages/components'),
		},
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
