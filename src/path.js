'use strict';

import path from 'path';
import isArray from 'lodash/isArray.js';
import { validate } from './validate.js';

// -----------------------------------------
// Functions

/**
 * Is url
 *
 * @param {string} url
 * @returns {boolean}
 */
const isUrl = (url) => {
    validate([{ title: 'url', type: 'string' }], null, url);
    return !!(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(url));
};

/**
 * Gets pwd path
 * @param  {string|array} src
 * @return {string|array}
 */
const getPwd = (src) => {
    validate([
        { title: 'src', anyOf: [
            { type: 'string', minLength: 1 },
            { type: 'array', items: { type: 'string' } }
        ] }
    ], null, src);

    let newSrc = src;

    if (!src) {
        return src;
    }

    if (typeof src === 'string') {
        if (isUrl(src)) { return src; }

        const pwd = process.env.PWD;
        if (pwd === undefined || pwd === null || typeof pwd !== 'string') {
            return src;
        }

        newSrc = (src[0] !== '/') ? path.join(pwd, src) : src;
    } else if (isArray(src)) {
        newSrc = src.map(val => getPwd(val));
    }

    return newSrc;
};

// -----------------------------------------
// Export

export { getPwd };
export { isUrl };

// Just for tests... We will get rid of this on the build process
export const __test__ = { getPwd, isUrl };
