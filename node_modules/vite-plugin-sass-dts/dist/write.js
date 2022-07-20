"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatExportTypeFileName = exports.formatWriteFileName = exports.formatExportType = exports.writeToFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prettier_1 = __importDefault(require("prettier"));
const util_1 = require("./util");
const writeToFile = async (prettierOptions, fileName, classNameKeys, globalOutFile) => {
    let exportTypes = '', exportClassNames = 'export type ClassNames = ';
    const exportStyle = 'export default classNames;';
    for (const classNameKey of classNameKeys.keys()) {
        exportTypes = `${exportTypes}\n${(0, exports.formatExportType)(classNameKey)}`;
        exportClassNames =
            exportClassNames !== 'export type ClassNames = '
                ? `${exportClassNames} | '${classNameKey}'`
                : `${exportClassNames} '${classNameKey}'`;
    }
    let outputFileString = '';
    if (globalOutFile) {
        const relativePath = (0, util_1.getRelativePath)(path_1.default.dirname(fileName), path_1.default.dirname(globalOutFile));
        const exportTypeFileName = (0, exports.formatExportTypeFileName)(globalOutFile);
        const globalClassNamesPrefix = classNameKeys.size === 0 ? '' : '| ';
        outputFileString = `import globalClassNames, { ClassNames as GlobalClassNames } from '${relativePath}${exportTypeFileName}'\n`;
        outputFileString = `${outputFileString}declare const classNames: typeof globalClassNames & {${exportTypes}\n};\n${exportStyle}\n${exportClassNames} ${globalClassNamesPrefix}GlobalClassNames`;
    }
    else {
        outputFileString = `declare const classNames: {${exportTypes}\n};\n${exportStyle}\n${exportClassNames}`;
    }
    const prettierdOutputFileString = prettier_1.default.format(outputFileString, prettierOptions);
    fs_1.default.writeFile((0, exports.formatWriteFileName)(fileName), `${prettierdOutputFileString}`, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
};
exports.writeToFile = writeToFile;
const formatExportType = (key) => `  readonly '${key}': '${key}';`;
exports.formatExportType = formatExportType;
const formatWriteFileName = (file) => `${file}${file.endsWith('d.ts') ? '' : '.d.ts'}`;
exports.formatWriteFileName = formatWriteFileName;
const formatExportTypeFileName = (file) => path_1.default.basename(file.replace('.ts', ''));
exports.formatExportTypeFileName = formatExportTypeFileName;
