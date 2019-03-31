import nodepath from 'path';
import nodefs from 'fs';
import Loader from './loader';

/**
 *
 */
export default class JsonFileLoader extends Loader {
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
        return typeof params === 'string';
    }

    /**
     * @param {string} params
     * @returns {Promise<*>}
     */
    async load(params) {
        return new Promise((resolve, reject) => {
            nodefs.readFile(nodepath.resolve(this.basedir, params), (err, content) => {
                if (err) {
                    reject(err);
                }

                if (content == null) {
                    reject(new Error('Content is undefined'));
                }

                let map;

                try {
                    map = JSON.parse(content);
                }
                catch (e) {
                    reject(e);
                }

                resolve(map);
            });
        });
    }
}
