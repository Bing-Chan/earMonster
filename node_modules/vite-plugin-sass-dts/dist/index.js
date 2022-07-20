"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prettier_1 = __importDefault(require("prettier"));
const main_1 = require("./main");
const util_1 = require("./util");
function Plugin(option = {}) {
    let cacheConfig;
    const enabledMode = option.enabledMode || ['development'];
    return {
        name: 'vite-plugin-sass-dts',
        async configResolved(config) {
            const prettierOptions = (await prettier_1.default.resolveConfig(config.root)) || {};
            cacheConfig = {
                ...config,
                prettierOptions: { ...prettierOptions, filepath: '*.d.ts' },
            };
        },
        handleHotUpdate(context) {
            if (!(0, util_1.isCSSModuleRequest)(context.file))
                return;
            (0, main_1.main)(context.file, cacheConfig, option);
            return;
        },
        transform(code, id) {
            if (!enabledMode.includes(cacheConfig.env.MODE)) {
                return { code };
            }
            const fileName = id.replace('?used', '');
            if (!(0, util_1.isCSSModuleRequest)(fileName))
                return { code };
            (0, main_1.main)(fileName, cacheConfig, option);
            return { code };
        },
    };
}
exports.default = Plugin;
