/* eslint-disable strict */'use strict';/* eslint-enable strict */

// -----------------------------------------
// Functions

/**
 * Redo string and makes sure is a string
 * @param   {string} str
 * @return  {string}
 */
function normalize(str) {
    return ('' + (str || '')).trim();
}

/**
 * Dashizes string
 * @param   {string} str
 * @return  {string}
 */
function dashize(str) {
    return normalize(str).toLowerCase().replace(/ /g, '-');
}

/**
 * Underscores string
 * @param   {string} str
 * @return  {string}
 */
function underscore(str) {
    return normalize(str).toLowerCase().replace(/ /g, '_');
}

/**
 * Camel case a string
 * @param  {string} str
 * @param  {boolean} alsoFirst
 * @param  {boolean} dontJoin
 * @return {string}
 */
function camelcase(str, alsoFirst, dontJoin) {
    str = normalize(str);

    if (str === '') {
        return str;
    }

    // Lower everything and remove hiphenization, underscores and /
    str = str.toLowerCase().replace(/-/g, ' ').replace(/_/g, ' ').replace(/\//g, ' ');

    // Uppercase all
    str = str.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
        return p1 + p2.toUpperCase();
    });

    // Remove spaces
    if (!dontJoin) {
        str = str.replace(/ /g, '');
    }

    // First shouldn't be camel case
    if (!alsoFirst) {
        str = str[0].toLowerCase() + str.slice(1, str.length);
    }

    // Finally the str
    return str;
}

// -----------------------------------------
// EXPORT

module.exports = {
    normalize: normalize,
    dashize: dashize,
    camelcase: camelcase,
    underscore: underscore
};
