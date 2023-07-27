import nodePolyfills from 'rollup-plugin-node-polyfills';
import { Plugin } from 'vite';

export const ConfigPolyfillsPlugin = () => {
  return nodePolyfills() as Plugin;
};
