/**
 *
 */
export default class Resolver {
    resourceAssets = {};

    /**
     * @param {string} resource
     * @param {string|null} namespace
     * @returns {string}
     */
    fromResource(resource, namespace) {
        if (namespace != null) {
            return this.resourceAssets[namespace] && this.resourceAssets[namespace][resource]
                ? this.resourceAssets[namespace][resource]
                : '';
        }

        let asset = '';

        for (const ns of Object.keys(this.resourceAssets)) {
            for (const res of Object.keys(this.resourceAssets[ns])) {
                if (resource === res) {
                    if (asset !== '') {
                        throw new Error(`There are two or more assets found for resource: ${resource}`);
                    }
                    asset = this.resourceAssets[ns][res];
                }
            }
        }

        return asset;
    }

    /**
     * @param {Object} list
     * @param {string} namespace
     */
    addResourceAssets(list, namespace) {
        if (namespace == null) {
            throw new Error('Namespace cannot be undefined');
        }

        if (!this.resourceAssets[namespace]) {
            this.resourceAssets[namespace] = {};
        }

        Object.assign(this.resourceAssets[namespace], list);
    }

    /**
     * @param {string} namespace
     */
    clearResourceAssets(namespace) {
        if (namespace == null) {
            this.resourceAssets = {};
        }
        else {
            delete this.resourceAssets[namespace];
        }
    }
}
