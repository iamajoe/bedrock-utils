/* eslint-disable strict */'use strict';/* eslint-enable strict */

var fs = require('fs');
var path = require('path');

// -----------------------------------------
// Functions

/**
 * Returns file in raw mode
 * @param  {string} pathSrc
 * @return {string}
 */
function readFile(pathSrc) {
    var filename = path.resolve(pathSrc);

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
