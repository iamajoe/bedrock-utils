/* eslint-disable strict */'use strict';/* eslint-enable strict */

var fs = require('fs');
var path = require('path');

// -----------------------------------------
// Functions

/**
 * Returns file in raw mode
 * @param  {string} pathSrc
 * @param  {string} dirname
 * @return {string}
 */
function readFile(pathSrc, dirname) {
    var filename = !!dirname ? path.join(dirname, pathSrc) : path.resolve(pathSrc);

    if (!fs.existsSync(filename)) {
        return false;
    }

    return fs.readFileSync(filename, 'utf8');
}

// ------------------------------------
// Export

module.exports = {
    readFile: readFile
};
