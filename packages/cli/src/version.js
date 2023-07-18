import fs from "node:fs";
const packageJson = JSON.parse(fs.readFileSync(__dirname, "utf-8"));
export const cliVersion = packageJson.version;
process.env.VANT_CLI_VERSION = cliVersion;
