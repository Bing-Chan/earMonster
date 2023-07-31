import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import type { UserConfig } from 'vite';
import { loadEnv } from './src/utils/viteBuild';

const pathResolve = (dir: string): any => {
	return resolve(__dirname, '.', dir);
};

const { VITE_PORT, VITE_APP_API_URL, VITE_API_PATH } = loadEnv();

const alias: Record<string, string> = {
	'/@': pathResolve('./src/'),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};

let proxy = {};
proxy[VITE_API_PATH] = {
	target: VITE_APP_API_URL,
	changeOrigin: true,
};

const viteConfig: UserConfig = {
	plugins: [vue()],
	root: process.cwd(),
	resolve: { alias },
	//base: '',
	optimizeDeps: {
		include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en', 'element-plus/lib/locale/lang/zh-tw'],
	},
	server: {
		port: VITE_PORT,
		proxy: proxy,
	},
	build: {
		outDir: 'dist',
		minify: 'esbuild',
		sourcemap: false,
		chunkSizeWarningLimit: 1500,
		rollupOptions: {
			output: {
				entryFileNames: `assets/[name].${new Date().getTime()}.js`,
				chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
				assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
			},
		},
	},
	css: {
		//css预处理
		preprocessorOptions: {
			scss: {
				/*
				引入var.scss全局预定义变量，
				如果引入多个文件，
				可以使用
				'@import "@/assets/scss/globalVariable1.scss";@import "@/assets/scss/globalVariable2.scss";'
				这种格式
				 */
				additionalData: '@import "/@/assets/scss/var.scss";',
			},
		},
	},
	define: {
		__VUE_I18N_LEGACY_API__: JSON.stringify(false),
		__VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
		__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
	},
};
export default viteConfig;
