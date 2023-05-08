const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: false,
	chainWebpack: (config) => {
		config.plugin('define').tap((args) => {
			let v = JSON.stringify(require('./package.json').version)
			args[0]['process.env']['VERSION'] = v
			return args
		})
		config.plugin('html').tap((args) => {
			args[0].title = 'BAUV Client'
			return args
		})
	}
})
