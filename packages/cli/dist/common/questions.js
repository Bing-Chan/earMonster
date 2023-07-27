import path from 'path';
import { fileURLToPath } from 'url';
import fs from './file';
const __filenameNew = fileURLToPath(import.meta.url);
const __dirnameNew = path.dirname(__filenameNew);
let TemplatePath = path.resolve(__dirnameNew, '../template/');
let questionOne = [
    {
        name: 'projectName',
        type: 'input',
        message: "Enter your Project's name:",
        validate(value) {
            if (value.length) {
                return true;
            }
            else {
                return `Please Enter your Project's name`;
            }
        },
    },
];
let questionAdd = [
    {
        name: 'templateName',
        type: 'input',
        message: "Enter your Template's name:",
        validate(value) {
            if (value.length) {
                if (/[\\\/\*\?\|\<\>\:\"]+/g.test(value) || /^\.+$/.test(value)) {
                    return `Template name is illegal.`;
                }
                return true;
            }
            else {
                return `Please Enter your Template's name.`;
            }
        },
    },
    {
        name: 'bAdd',
        type: 'confirm',
        message: function (args) {
            if (fs.fsExistsSync(path.join(TemplatePath, args.templateName))) {
                return `The template name '${args.templateName}' already exists, whether it is overwritten?`;
            }
            return `Confirm Template's name：${args.templateName}`;
        },
        default: true,
    },
];
let questionRemove = [
    {
        name: 'templateName',
        type: 'list',
        message: 'Remove template:',
        choices: [],
    },
    {
        name: 'bRemove',
        type: 'confirm',
        message: function (args) {
            return `Confirm remove Template's name：${args.templateName}`;
        },
        default: false,
    },
];
export default {
    questionOne,
    questionAdd,
    questionRemove,
};
