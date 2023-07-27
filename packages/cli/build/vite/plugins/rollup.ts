/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */

import type { PluginOption } from 'vite';

import { ConfigPolyfillsPlugin } from './polyfills';
export function createRollupPlugins() {

  const  rollupPlugins: (PluginOption | PluginOption[])[] = [
  ];
  // 添加rollUP打包内置命令使用
  rollupPlugins.push(ConfigPolyfillsPlugin());

  return rollupPlugins;
}
