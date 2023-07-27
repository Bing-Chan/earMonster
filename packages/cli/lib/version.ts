import fs from 'fs';
import { URL, fileURLToPath } from 'node:url';

export const cliVersion = '8.0.0';
const packagePath = fileURLToPath(new URL('../package.json', import.meta.url));
// const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
// export const cliVersion = packageJson.version;
// process.env.VANT_CLI_VERSION = cliVersion;
