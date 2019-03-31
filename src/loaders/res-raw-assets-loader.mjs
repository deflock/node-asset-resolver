import nodepath from 'path';
import {readFile} from '@deflock/fs';
import Loader from './loader';

/**
 *
 */
export default class ResRawAssetsLoader extends Loader {
    /**
     * @param {string} basedir
     */
    constructor(basedir) {
        super();
        this.basedir = basedir;
    }

    /**
     * @param {*} params
     * @returns {boolean}
     */
    supports(params) {
        return typeof params === 'object' && params.type === 'res-raw-assets';
    }

    /**
     * @param {string} params
     * @returns {Promise<*>}
     */
    async load(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const resToRawJson = await readFile(nodepath.resolve(this.basedir, params.resToRaw));
                const rawToAssetsJson = await readFile(nodepath.resolve(this.basedir, params.rawToAssets));

                const resToRaw = JSON.parse(resToRawJson);
                const rawToAssets = JSON.parse(rawToAssetsJson);

                const map = {};

                for (const res of Object.keys(resToRaw)) {
                    map[res] = rawToAssets[resToRaw[res]];
                }

                resolve(map);
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
