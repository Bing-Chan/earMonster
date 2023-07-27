import { URL, fileURLToPath } from 'node:url';
export const cliVersion = '8.0.0';
const packagePath = fileURLToPath(new URL('../package.json', import.meta.url));
