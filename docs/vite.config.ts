import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts'
import Inspect from 'vite-plugin-inspect'

const path = require('path')

export default defineConfig({
	plugins: [sassDts(), Inspect()],
	resolve: {
		alias: {
			'@ear-monster/components': path.resolve(__dirname, '../packages/components'),
			'@ear-monster/use': path.resolve(__dirname, '../packages/use'),
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
	// 添加CSS相关配置解决@charset问题
	css: {
		preprocessorOptions: {
			scss: {
				// 确保scss编译时不会在文件开头添加@charset
				additionalData: '$charset: "UTF-8";',
				charset: false,
			},
		},
		// 配置CSS构建选项
		postcss: {
			plugins: [
				{
					postcssPlugin: 'no-charset-at-rule',
					onAtRule(atRule) {
						if (atRule.name === 'charset') {
							atRule.remove()
						}
					},
				},
			],
		},
	},
})
