import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import fs from "fs-extra";
export default {
    fsExistsSync(path) {
        if (fs.existsSync(path)) {
            return true;
        }
        return false;
    },
    //show CYJh CLI
    showNpmInfo() {
        clear();
        console.log(chalk.yellow(figlet.textSync("EAR CLI", { horizontalLayout: "full" })));
    },
    //copy
    copy(from, to, filter) {
        return new Promise((resolve, reject) => {
            fs.copy(from, to, filter, err => {
                if (!err)
                    resolve(true);
                reject(err);
            });
        });
    },
    //clear dir
    emptyDir(dir) {
        return new Promise((resolve, reject) => {
            fs.emptyDir(dir, err => {
                if (!err)
                    resolve(true);
                reject(err);
            });
        });
    },
    //remove dir
    remove(dir) {
        return new Promise((resolve, reject) => {
            fs.remove(dir, err => {
                if (!err)
                    resolve(true);
                reject(err);
            });
        });
    },
    //outPutFile
    outPutFile(file, content = "") {
        return new Promise((resolve, reject) => {
            fs.outputFile(file, content, (err) => {
                if (!err)
                    resolve(true);
                reject(err);
            });
        });
    },
    //show Info
    showCreateDirInfo(type = "begin") {
        if (type === "begin") {
            console.log(chalk.white("\n Start creating Project..."));
            return;
        }
        if (type === "end") {
            console.log(chalk.white("\n Creating Project OK..."));
            return;
        }
        console.log(chalk.white(`\n ${type}`));
    },
    //readdir
    readdir(dir) {
        return new Promise((resolve, reject) => {
            fs.readdir(dir, (err, data) => {
                if (!err)
                    resolve(data);
                reject(err);
            });
        });
    },
    //check dir
    ensureDir(dir) {
        return new Promise((resolve, reject) => {
            fs.ensureDir(dir, (err) => {
                if (!err)
                    resolve(true);
                reject(err);
            });
        });
    },
    //
};
