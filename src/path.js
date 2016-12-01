/* eslint-disable strict */'use strict';/* eslint-enable strict */

// -----------------------------------------
// Functions

/**
 * Check if url is valid
 *
 * @param {string} url
 * @returns
 */
function isUrl(url) {
    var pattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    return pattern.test(url);
}

// ------------------------------------
// Export

module.exports = {
    isUrl: isUrl
};
