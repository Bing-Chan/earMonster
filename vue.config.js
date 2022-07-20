const path = require('path')

module.exports = {
	pages: {
		index: {
			entry: './play/main.ts',
		},
	},
	assetsDir: './',
	chainWebpack: config => {
		config.resolve.alias.set('@request_cb', path.resolve(__dirname, 'packages'))
	},
}
