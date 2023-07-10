import { Command } from 'commander'
import { cliVersion } from './version.js'
import runInit from './command/init.js'

const program = new Command()
program.version(`@ear/cli ${cliVersion}`)

program
	.command('init')
	.description('Generate a new empty project')
	.option('-P,--pc', 'use pc template')
	.option('-H,--h5', 'use h5 template')
	.action(async options => {
		runInit(options)
	})

program.parse()