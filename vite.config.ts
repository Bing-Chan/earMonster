const path = require('path')

module.exports = {
	assetsDir: './',
	chainWebpack: config => {
		config.resolve.alias.set('@ear-monster', path.resolve(__dirname, 'packages/components'))
	},
}
