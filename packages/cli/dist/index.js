import { __awaiter } from "tslib";
import { Command } from 'commander';
import { cliVersion } from './version';
import runInit from './command/init';
const program = new Command();
program.version(`@ear/cli ${cliVersion}`);
program
    .command('init')
    .description('Generate a new empty project')
    .option('-P,--pc', 'use pc template')
    .option('-H,--h5', 'use h5 template')
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    runInit(options);
}));
program.parse();
