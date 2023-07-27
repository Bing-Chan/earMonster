import { defineConfig } from 'vite'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'
import { resolve } from 'path'

export default defineConfig({
	plugins: [ nodePolyfills() ],
	resolve: {
		alias: {
			'./runtimeConfig': './runtimeConfig.browser',
		},
	},
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: resolve(__dirname, 'lib/index.ts'),
			name: 'ear-cli',
			// the proper extensions will be added
			fileName: 'ear-cli',
			formats: ['es'],
		},
	},
})
