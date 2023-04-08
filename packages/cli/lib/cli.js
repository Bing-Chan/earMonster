
import { cliVersion } from './index.js'
import { Command } from 'commander'
const program = new Command()
program.version(`@galaxy/cli ${cliVersion}`)

program
	.command('init <name>')
	.description('init Project')
	.action(name => {
		console.log('开始执行命令999999' + name)
		// const { dev } = await import('./commands/dev.js')
		// return dev()
	})

program.parse()
