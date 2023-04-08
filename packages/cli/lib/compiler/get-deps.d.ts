export declare function fillExt(filePath: string): {
    path: string;
    isIndex: boolean;
};
export declare function clearDepsCache(): void;
export declare function getDeps(filePath: string): string[];
/**
 * 1. Replace .vue extension
 * @example "import App from 'App.vue';" => "import App from 'App.xxx';"
 *
 * 2. if using .mjs or .cjs, complete the import path
 * @example import './foo' -> import './foo.mjs'
 * @example import './foo' -> import './foo/index.mjs'
 */
export declare function replaceScriptImportExt(code: string, filePath: string, ext: string): string;
