'use strict';

// -----------------------------------------
// IMPORTS

var colors = require('colors/safe');

// -----------------------------------------
// VARS

var projectName = 'project';

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Log a string
 * @param  {string} module
 * @param  {string} str
 */
function log(module, str) {
    if (typeof str === 'string' && str.replace(/ /g, '') === '') {
        return;
    }

    var project = colors.bgBlack.white('[' + projectName + '] ');
    var module = colors.bgBlack.green('[' + module + '] ');

    console.log(project + module + str);
}

/**
 * Logs without module
 * @param  {string} str
 */
function logEmpty(str) {
    if (typeof str === 'string' && str.replace(/ /g, '') === '') {
        return;
    }

    var project = colors.bgBlack.white('[' + projectName + '] ');
    //var module = colors.bgBlack.cyan('[' + module + '] ');

    console.log(project + colors.bgBlack.cyan(str));
}

/**
 * Logs a warn
 * @param  {string} module
 * @param  {string} str
 */
function logWarn(module, str) {
    if (typeof str === 'string' && str.replace(/ /g, '') === '') {
        return;
    }

    var project = colors.bgBlack.white('[' + projectName + '] ');
    var type = colors.bold.bgBlack.yellow('[warn] ');
    var module = colors.bgBlack.yellow('[' + module + '] ');

    console.warn(project + type + module + str);
}

/**
 * Logs an error
 * @param  {string} module
 * @param  {string} err
 */
function logErr(module, err) {
    if (typeof err === 'string' && err.replace(/ /g, '') === '') {
        return;
    }

    var project = colors.bgBlack.white('[' + projectName + '] ');
    var type = colors.bold.bgBlack.red('[error] ');
    var module = colors.bgBlack.red('[' + module + '] ');

    console.error(project + type + module + err);
}

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = {
    log: log,
    logEmpty: logEmpty,
    logWarn: logWarn,
    logErr: logErr
};
