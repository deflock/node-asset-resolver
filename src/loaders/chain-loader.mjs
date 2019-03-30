/**
 *
 */
export default class ChainLoader {
    /**
     * @param {Array} loaders
     */
    constructor(loaders) {
        this.loaders = loaders;
    }

    /**
     * @param {*} params
     * @returns {boolean}
     */
    supports(params) {
        for (const loader of this.loaders) {
            if (loader.supports(params)) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {string} params
     * @returns {Promise<*>}
     */
    async load(params) {
        for (const loader of this.loaders) {
            if (loader.supports(params)) {
                return loader.load(params);
            }
        }
        throw new Error('No loader found');
    }
}
