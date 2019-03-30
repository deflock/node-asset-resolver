/**
 *
 */
export default class Loader {
    /**
     * @param {*} params
     * @returns {boolean}
     */
    supports(params) {
        throw new Error('Method "supports()" not implemented');
    }

    /**
     * @param {string} params
     * @returns {Promise<*>}
     */
    async load(params) {
        throw new Error('Method "load()" not implemented');
    }
}
