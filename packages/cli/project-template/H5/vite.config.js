"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins_1 = require("./build/vite/plugins");
const path_1 = require("path");
const vite_1 = require("vite");
const utils_1 = require("./build/utils");
const pathResolve = (dir) => {
    return (0, path_1.resolve)(process.cwd(), '.', dir);
};
// https://vitejs.dev/config/
function default_1({ command, mode }) {
    const isProduction = command === 'build';
    const root = process.cwd();
    const env = (0, vite_1.loadEnv)(mode, root);
    const viteEnv = (0, utils_1.wrapperEnv)(env);
    return {
        root,
        resolve: {
            alias: [
                {
                    find: 'vue-i18n',
                    replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
                },
                // /@/xxxx => src/xxxx
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/',
                },
                // /#/xxxx => types/xxxx
                {
                    find: /\/#\//,
                    replacement: pathResolve('types') + '/',
                },
            ],
        },
        server: {
            port: 9010,
            proxy: {
                '/third': {
                    target: 'http://10.130.131.93:9807/',
                    changeOrigin: true,
                },
            },
        },
        plugins: (0, plugins_1.createVitePlugins)(viteEnv, isProduction),
        build: {
            minify: 'terser',
            terserOptions: {
                compress: {
                    //生产环境时移除console
                    drop_console: true,
                    drop_debugger: true,
                },
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // 配置 nutui 全局 scss 变量
                    additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";@import '/@/styles/mixin.scss';`,
                },
            },
        },
    };
}
exports.default = default_1;
