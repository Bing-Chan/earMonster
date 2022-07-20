"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCss = void 0;
const options_1 = require("./options");
const SPLIT_STR = `/* vite-plugin-sass-dts */\n`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let loadedSassPreprocessor;
const parseCss = async (file, fileName, config) => {
    const sass = loadSassPreprocessor(config);
    const options = (0, options_1.getPreprocessorOptions)(config);
    const resolveFn = config.createResolver({
        extensions: ['.scss', '.sass', '.css'],
        mainFields: ['sass', 'style'],
        tryIndex: true,
        tryPrefix: '_',
        preferRelative: true,
    });
    const internalImporter = (url, importer, done) => {
        resolveFn(url, importer).then((resolved) => {
            if (resolved) {
                new Promise(function (resolve) {
                    resolve({ file: resolved });
                })
                    .then(done)
                    .catch(done);
            }
            else {
                done && done(null);
            }
        });
    };
    const finalImporter = [internalImporter];
    if (options.importer) {
        Array.isArray(options.importer)
            ? finalImporter.push(...options.importer)
            : finalImporter.push(options.importer);
    }
    const result = sass.renderSync({
        ...options,
        data: await getData(file.toString(), fileName, options.additionalData),
        file: fileName,
        includePaths: options.includePaths,
        importer: finalImporter,
    });
    const splitted = result.css.toString().split(SPLIT_STR);
    return { localStyle: splitted[1] || '', globalStyle: splitted[0] };
};
exports.parseCss = parseCss;
const getData = (data, filename, additionalData) => {
    if (!additionalData)
        return `\n${SPLIT_STR}${data}`;
    if (typeof additionalData === 'function') {
        return additionalData(`\n${SPLIT_STR}${data}`, filename);
    }
    return `${additionalData}\n${SPLIT_STR}${data}`;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loadSassPreprocessor = (config) => {
    try {
        if (loadedSassPreprocessor) {
            return loadedSassPreprocessor;
        }
        const fallbackPaths = require.resolve.paths?.('sass') || [];
        const resolved = require.resolve('sass', {
            paths: [config.root, ...fallbackPaths],
        });
        return (loadedSassPreprocessor = require(resolved));
    }
    catch (e) {
        throw new Error(`Preprocessor dependency 'sass' not found. Did you install it?`);
    }
};
