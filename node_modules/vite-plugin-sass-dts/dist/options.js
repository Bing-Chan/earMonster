"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreprocessorOptions = exports.getParseCase = void 0;
const util_1 = require("./util");
const getParseCase = (config) => {
    if (!config.css ||
        !config.css.modules ||
        !config.css.modules.localsConvention) {
        return;
    }
    const { localsConvention } = config.css.modules;
    if (localsConvention === 'camelCase' ||
        localsConvention === 'camelCaseOnly') {
        return util_1.toCamelCase;
    }
    else if (localsConvention === 'dashes' ||
        localsConvention === 'dashesOnly') {
        return util_1.toDashCase;
    }
    return;
};
exports.getParseCase = getParseCase;
const getPreprocessorOptions = (config) => {
    let additionalData, includePaths, importer;
    if (!config.css ||
        !config.css.preprocessorOptions ||
        !config.css.preprocessorOptions.scss) {
        return { additionalData, includePaths, importer };
    }
    return config.css.preprocessorOptions.scss;
};
exports.getPreprocessorOptions = getPreprocessorOptions;
