/* @flow *//* :: import type {IsUrl, GetPwd} from "./_test/path.flow.js" */
'use strict';

import path from 'path';
import isArray from 'lodash/isArray.js';

// -----------------------------------------
// Functions

/**
 * Is url
 *
 * @param {string} url
 * @returns {boolean}
 */
const isUrl/* :: :IsUrl */ = (url) => !!(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(url));

/**
 * Gets pwd path
 * @param  {string|array} src
 * @return {string|array}
 */
const getPwd/* :: :GetPwd */ = (src) => {
    let newSrc = src;

    if (src && typeof src === 'string') {
        if (isUrl(src)) { return src; }

        const pwd = process.env.PWD;
        if (pwd === undefined || pwd === null || typeof pwd !== 'string') {
            return src;
        }

        newSrc = (src[0] !== '/') ? path.join(pwd, src) : src;
    } else if (src && isArray(src)/* :: && Array.isArray(src) */) {
        newSrc = src.map(val => getPwd(val));
    }

    return newSrc;
};

// ------------------------------------
// Export

export default { isUrl, getPwd };
