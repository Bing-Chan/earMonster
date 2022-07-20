/// <reference types="node" />
import { CSS, FinalConfig } from './type';
export declare const parseCss: (file: Buffer, fileName: string, config: FinalConfig) => Promise<CSS>;
