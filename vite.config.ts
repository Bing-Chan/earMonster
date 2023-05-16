const path = require('path')

module.exports = {
	assetsDir: './',
	chainWebpack: config => {
		config.resolve.alias.set('@request_cb', path.resolve(__dirname, 'packages/components'))
	},
}
