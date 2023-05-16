const path = require('path')

module.exports = {
	assetsDir: './',
	chainWebpack: config => {
		config.resolve.alias.set('@galaxy6', path.resolve(__dirname, 'packages/components'))
	},
}
