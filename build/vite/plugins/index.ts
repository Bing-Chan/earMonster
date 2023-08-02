/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */

import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ConfigSvgIconsPlugin } from './svgIcons';
import { ConfigCompressPlugin } from './compress';
import { ConfigRestartPlugin } from './restart';
import { ConfigProgressPlugin } from './progress';

export function createVitePlugins(env: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // vue支持
    vue(),
  ];


  // 开启.gz压缩  rollup-plugin-gzip
  vitePlugins.push(ConfigCompressPlugin());

  // 监听配置文件改动重启
  vitePlugins.push(ConfigRestartPlugin());

  // 构建时显示进度条
  vitePlugins.push(ConfigProgressPlugin());

  // vite-plugin-svg-icons
  vitePlugins.push(ConfigSvgIconsPlugin(isBuild));

  return vitePlugins;
}
