import { Command } from 'commander'
import { cliVersion } from './version.js'

const program = new Command()
program.version(`@vant/cli ${cliVersion}`)

program
	.command('init')
	.description('Generate a new empty project')
	.option('--pc', 'use pc template')
	.option('--h5', 'use h5 template')
	.action(async options => {
		console.log('生成项目')
	})

program.parse()
