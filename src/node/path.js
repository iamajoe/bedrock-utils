/* eslint-disable strict */'use strict';/* eslint-enable strict */

var path = require('path');
var bedrockPath = require('../path.js');
var type = require('../type.js');

// -----------------------------------------
// Functions

/**
 * Gets pwd path
 * @param  {string} src
 * @return {string}
 */
function getPwd(src) {
    var newSrc = src;

    if (src && typeof src === 'string') {
        if (bedrockPath.isUrl(src)) {
            return src;
        }

        newSrc = (src[0] !== '/') ? path.join(process.env.PWD, src) : src;
    } else if (type.isArray(src)) {
        newSrc = src.map(function (val) { return getPwd(val); });
    }

    return newSrc;
}

// ------------------------------------
// Export

module.exports = {
    isUrl: bedrockPath.isUrl,
    getPwd: getPwd
};
