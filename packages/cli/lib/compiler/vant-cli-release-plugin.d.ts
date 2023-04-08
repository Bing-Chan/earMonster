import { Plugin } from 'release-it';
declare class VantCliReleasePlugin extends Plugin {
    beforeRelease(): Promise<void>;
}
export default VantCliReleasePlugin;
