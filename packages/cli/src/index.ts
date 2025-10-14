import { Command } from 'commander'
import { cliVersion } from './lib/index'
import runInit from './build'

const program = new Command()
program.version(`@ear/cli ${cliVersion}`)

program
	.command('init')
	.description('Generate a new empty project')
	.option('-P,--pc', 'use pc template')
	.option('-H,--h5', 'use h5 template')
	.action((options: any) => {
		runInit(options)
	})



program.parse()
