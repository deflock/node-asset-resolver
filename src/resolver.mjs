/**
 *
 */
export default class Resolver {
    resourceAssets = {};
    rawAssets = {};

    /**
     * @param {string} resource
     * @param {string|null} namespace
     * @returns {string|null}
     */
    fromResource(resource, namespace) {
        if (namespace != null) {
            return this.resourceAssets[namespace] && this.resourceAssets[namespace][resource]
                ? this.resourceAssets[namespace][resource]
                : null;
        }

        let asset = null;

        for (const ns of Object.keys(this.resourceAssets)) {
            for (const res of Object.keys(this.resourceAssets[ns])) {
                if (resource === res) {
                    if (asset !== null) {
                        throw new Error(`There are two or more assets found for resource: ${resource}`);
                    }
                    asset = this.resourceAssets[ns][res];
                }
            }
        }

        return asset;
    }

    /**
     * @param {string} resource
     * @param {string|null} namespace
     * @returns {boolean}
     */
    hasResource(resource, namespace) {
        if (namespace != null) {
            return typeof this.resourceAssets[namespace] === 'object'
                && Object.prototype.hasOwnProperty.call(this.resourceAssets[namespace], resource);
        }

        for (const ns of Object.keys(this.resourceAssets)) {
            for (const res of Object.keys(this.resourceAssets[ns])) {
                if (resource === res) {
                    return true;
                }
            }
        }

        return false;
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

    /**
     * @param {string} raw
     * @returns {string|null}
     */
    fromRaw(raw) {
        return this.rawAssets && this.rawAssets[raw]
            ? this.rawAssets[raw]
            : null;
    }

    /**
     * @param {string} raw
     * @returns {boolean}
     */
    hasRaw(raw) {
        return typeof this.rawAssets === 'object'
            && Object.prototype.hasOwnProperty.call(this.rawAssets, raw);
    }

    /**
     * @param {Object} list
     */
    addRawAssets(list) {
        Object.assign(this.rawAssets, list);
    }

    /**
     *
     */
    clearRawAssets() {
        this.rawAssets = {};
    }
}
