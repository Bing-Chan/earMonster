"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const fs_1 = __importDefault(require("fs"));
const postcss_1 = __importDefault(require("postcss"));
const postcss_js_1 = __importDefault(require("postcss-js"));
const css_1 = require("./css");
const extract_1 = require("./extract");
const options_1 = require("./options");
const util_1 = require("./util");
const write_1 = require("./write");
const main = (fileName, config, option) => {
    try {
        fs_1.default.readFile(fileName, async (err, file) => {
            if (err) {
                console.error(err);
            }
            else {
                try {
                    const css = fileName.endsWith('.css')
                        ? { localStyle: file.toString() }
                        : await (0, css_1.parseCss)(file, fileName, config);
                    const toParseCase = (0, options_1.getParseCase)(config);
                    const classNameKeys = (0, extract_1.extractClassNameKeys)(postcss_js_1.default.objectify(postcss_1.default.parse(css.localStyle)), toParseCase);
                    (0, write_1.writeToFile)(config.prettierOptions, fileName, classNameKeys, option.global?.outFile);
                    if (!!css.globalStyle && option.global?.generate) {
                        const globalClassNameKeys = (0, extract_1.extractClassNameKeys)(postcss_js_1.default.objectify(postcss_1.default.parse(css.globalStyle)), toParseCase);
                        (0, write_1.writeToFile)(config.prettierOptions, option.global?.outFile, globalClassNameKeys);
                    }
                }
                catch (e) {
                    if ((0, util_1.isSassException)(e) && e.file !== fileName) {
                        console.error('e :>> ', e);
                    }
                }
            }
        });
    }
    catch (e) {
        console.error('e :>> ', e);
    }
};
exports.main = main;
