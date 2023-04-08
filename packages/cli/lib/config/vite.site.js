import { join } from 'node:path';
import { createRequire } from 'node:module';
import hljs from 'highlight.js';
import vitePluginMd from 'vite-plugin-md';
import vitePluginVue from '@vitejs/plugin-vue';
import vitePluginJsx from '@vitejs/plugin-vue-jsx';
import { setBuildTarget, getVantConfig, isDev } from '../common/index.js';
import { SITE_DIST_DIR, SITE_SRC_DIR } from '../common/constant.js';
import lodash from 'lodash';
import { genSiteMobileShared } from '../compiler/gen-site-mobile-shared.js';
import { genSiteDesktopShared } from '../compiler/gen-site-desktop-shared.js';
import { genPackageStyle } from '../compiler/gen-package-style.js';
import { CSS_LANG } from '../common/css.js';
function markdownHighlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
        // https://github.com/highlightjs/highlight.js/issues/2277
        return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
    }
    return '';
}
function markdownCardWrapper(htmlCode) {
    const group = htmlCode
        .replace(/<h3/g, ':::<h3')
        .replace(/<h2/g, ':::<h2')
        .split(':::');
    return group
        .map((fragment) => {
        if (fragment.indexOf('<h3') !== -1) {
            return `<div class="van-doc-card">${fragment}</div>`;
        }
        return fragment;
    })
        .join('');
}
// add target="_blank" to all links
function markdownLinkOpen(md) {
    const defaultRender = md.renderer.rules.link_open;
    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const aIndex = tokens[idx].attrIndex('target');
        if (aIndex < 0) {
            tokens[idx].attrPush(['target', '_blank']); // add new attribute
        }
        if (defaultRender) {
            return defaultRender(tokens, idx, options, env, self);
        }
        return self.renderToken(tokens, idx, options);
    };
}
function getSiteConfig(vantConfig) {
    const siteConfig = vantConfig.site;
    if (siteConfig.locales) {
        return siteConfig.locales[siteConfig.defaultLang || 'en-US'];
    }
    return siteConfig;
}
function getTitle(config) {
    let { title } = config;
    if (config.description) {
        title += ` - ${config.description}`;
    }
    return title;
}
function getHTMLMeta(vantConfig) {
    var _a;
    const meta = (_a = vantConfig.site) === null || _a === void 0 ? void 0 : _a.htmlMeta;
    if (meta) {
        return Object.keys(meta)
            .map((key) => `<meta name="${key}" content="${meta[key]}">`)
            .join('\n');
    }
    return '';
}
function vitePluginGenVantBaseCode() {
    const virtualMobileModuleId = 'site-mobile-shared';
    const resolvedMobileVirtualModuleId = `vant-cli:${virtualMobileModuleId}`;
    const virtualDesktopModuleId = 'site-desktop-shared';
    const resolvedDesktopVirtualModuleId = `vant-cli:${virtualDesktopModuleId}`;
    const virtualPackageStyleModuleId = /package-style/;
    const resolvedPackageStyleVirtualModuleId = `vant-cli${virtualPackageStyleModuleId}index.${CSS_LANG}`;
    return {
        name: 'vite-plugin(vant-cli):gen-site-base-code',
        resolveId(id) {
            if (id === virtualMobileModuleId) {
                return resolvedMobileVirtualModuleId;
            }
            if (id === virtualDesktopModuleId) {
                return resolvedDesktopVirtualModuleId;
            }
            if (virtualPackageStyleModuleId.test(id)) {
                return resolvedPackageStyleVirtualModuleId;
            }
        },
        load(id) {
            switch (id) {
                case resolvedMobileVirtualModuleId:
                    return genSiteMobileShared();
                case resolvedDesktopVirtualModuleId:
                    return genSiteDesktopShared();
                case resolvedPackageStyleVirtualModuleId:
                    return genPackageStyle();
                default:
                    break;
            }
        },
    };
}
function vitePluginHTML(data) {
    return {
        name: 'vite-plugin-html',
        transformIndexHtml: {
            enforce: 'pre',
            transform(html) {
                return lodash.template(html)(data);
            },
        },
    };
}
export function getViteConfigForSiteDev() {
    var _a, _b, _c;
    setBuildTarget('site');
    const vantConfig = getVantConfig();
    const siteConfig = getSiteConfig(vantConfig);
    const title = getTitle(siteConfig);
    const headHtml = (_a = vantConfig.site) === null || _a === void 0 ? void 0 : _a.headHtml;
    const baiduAnalytics = (_b = vantConfig.site) === null || _b === void 0 ? void 0 : _b.baiduAnalytics;
    const enableVConsole = isDev() && ((_c = vantConfig.site) === null || _c === void 0 ? void 0 : _c.enableVConsole);
    return {
        root: SITE_SRC_DIR,
        optimizeDeps: {
            // https://github.com/youzan/vant/issues/10930
            include: ['vue', 'vue-router'],
        },
        plugins: [
            vitePluginGenVantBaseCode(),
            vitePluginVue({
                include: [/\.vue$/, /\.md$/],
            }),
            vitePluginMd({
                wrapperClasses: 'van-doc-markdown-body',
                transforms: {
                    after: markdownCardWrapper,
                },
                markdownItOptions: {
                    typographer: false,
                    highlight: markdownHighlight,
                },
                markdownItSetup(md) {
                    const require = createRequire(import.meta.url);
                    const { slugify } = require('transliteration');
                    const markdownItAnchor = require('markdown-it-anchor');
                    markdownLinkOpen(md);
                    md.use(markdownItAnchor, {
                        level: 2,
                        slugify,
                    });
                },
            }),
            vitePluginJsx(),
            vitePluginHTML({
                ...siteConfig,
                title,
                // `description` is used by the HTML ejs template,
                // so it needs to be written explicitly here to avoid error: description is not defined
                description: siteConfig.description,
                headHtml,
                baiduAnalytics,
                enableVConsole,
                meta: getHTMLMeta(vantConfig),
            }),
        ],
        server: {
            host: '0.0.0.0',
        },
    };
}
export function getViteConfigForSiteProd() {
    var _a, _b, _c, _d;
    const devConfig = getViteConfigForSiteDev();
    const vantConfig = getVantConfig();
    const outDir = ((_b = (_a = vantConfig.build) === null || _a === void 0 ? void 0 : _a.site) === null || _b === void 0 ? void 0 : _b.outputDir) || SITE_DIST_DIR;
    const publicPath = ((_d = (_c = vantConfig.build) === null || _c === void 0 ? void 0 : _c.site) === null || _d === void 0 ? void 0 : _d.publicPath) || '/';
    return {
        ...devConfig,
        base: publicPath,
        build: {
            outDir,
            reportCompressedSize: false,
            emptyOutDir: true,
            // https://github.com/vant-ui/vant/issues/9703
            cssTarget: ['chrome53'],
            rollupOptions: {
                input: {
                    main: join(SITE_SRC_DIR, 'index.html'),
                    mobile: join(SITE_SRC_DIR, 'mobile.html'),
                },
                output: {
                    manualChunks: {
                        'vue-libs': ['vue', 'vue-router'],
                    },
                },
            },
        },
    };
}
