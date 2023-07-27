declare const _default: {
    fsExistsSync(path: any): boolean;
    showNpmInfo(): void;
    copy(from: any, to: any, filter: any): Promise<unknown>;
    emptyDir(dir: any): Promise<unknown>;
    remove(dir: any): Promise<unknown>;
    outPutFile(file: any, content?: string): Promise<unknown>;
    showCreateDirInfo(type?: string): void;
    readdir(dir: any): Promise<unknown>;
    ensureDir(dir: any): Promise<unknown>;
};
export default _default;
