/* eslint-disable strict */'use strict';/* eslint-enable strict */

// -----------------------------------------
// Functions

/**
 * Check if is array
 * @param  {*} val
 * @return {boolean}
 */
function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
}

// ------------------------------------
// Export

module.exports = {
    isArray: isArray
};
