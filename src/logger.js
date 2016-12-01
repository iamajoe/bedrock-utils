/* eslint-disable strict */'use strict';/* eslint-enable strict */

// -----------------------------------------
// Functions

/**
 * Log message
 * @param  {string} module
 * @param  {*} msg
 * @param  {boolean} isProd
 */
function log(module, msg, isProd) {
    if (!msg) {
        msg = module || '';
        module = null;
    }

    // Build message
    module = (!!module) ? '[' + module + ']' : '';

    /* eslint-disable no-console */
    return !isProd && console.log(module, msg);
    /* eslint-enable no-console */
}

/**
 * Warns message
 * @param  {string} module
 * @param  {*} msg
 * @param  {boolean} isProd
 */
function warn(module, msg, isProd) {
    if (!msg) {
        msg = module || '';
        module = null;
    }

    // Build message
    module = (!!module) ? '[' + module + ']' : '';

    /* eslint-disable no-console */
    return !isProd && console.warn(module, msg);
    /* eslint-enable no-console */
}

/**
 * Error message
 * @param  {string} module
 * @param  {*} msg
 * @param  {boolean} isProd
 */
function err(module, msg, isProd) {
    if (!msg) {
        msg = module || '';
        module = null;
    }

    // Build message
    module = (!!module) ? '[' + module + ']' : '';

    /* eslint-disable no-console */
    return !isProd && console.error(module, msg);
    /* eslint-enable no-console */
}

// -------------------------------------------
// EXPORT

module.exports = {
    log: log,
    warn: warn,
    err: err
};
