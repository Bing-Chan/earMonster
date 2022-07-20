import { Options } from 'prettier';
export declare const writeToFile: (prettierOptions: Options, fileName: string, classNameKeys: Map<string, boolean>, globalOutFile?: string) => Promise<void>;
export declare const formatExportType: (key: string) => string;
export declare const formatWriteFileName: (file: string) => string;
export declare const formatExportTypeFileName: (file: string) => string;
