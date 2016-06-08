'use strict';

// -----------------------------------------
// IMPORTS

var colors = require('colors/safe');

// -----------------------------------------
// VARS

var projectName = '';
var moduleName = '';

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Sets project name
 * @param {string} str
 */
function setProject(str) {
    projectName = '[' + str + ']';
}

/**
 * Sets module string
 * @param {string} str
 */
function setModule(str) {
    moduleName = '[' + str + '] ';
}

/**
 * Log a string
 * @param  {string} str
 */
function log(str) {
    var project;
    var module;

    if (typeof str === 'string' && str.replace(/ /g, '') === '') {
        return;
    }

    project = colors.bgBlack.white(projectName);
    module = colors.bgBlack.green(moduleName);

    console.log(project + module + str);
}

/**
 * Logs without module
 * @param  {string} str
 */
function logEmpty(str) {
    var project;

    if (typeof str === 'string' && str.replace(/ /g, '') === '') {
        return;
    }

    project = colors.bgBlack.white(projectName);

    console.log(project + colors.bgBlack.cyan(str));
}

/**
 * Logs a warn
 * @param  {string} str
 */
function logWarn(str) {
    var project;
    var module;
    var type;

    if (typeof str === 'string' && str.replace(/ /g, '') === '') {
        return;
    }

    project = colors.bgBlack.white(projectName);
    type = colors.bold.bgBlack.yellow('[warn] ');
    module = colors.bgBlack.yellow(moduleName);

    console.warn(project + type + module + str);
}

/**
 * Logs an error
 * @param  {string} module
 * @param  {string} err
 */
function logErr(err) {
    var project;
    var module;
    var type;

    if (typeof err === 'string' && err.replace(/ /g, '') === '') {
        return;
    }

    project = colors.bgBlack.white(projectName);
    type = colors.bold.bgBlack.red('[error] ');
    module = colors.bgBlack.red(moduleName);

    console.error(project + type + module + err);
}

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = {
    setProject: setProject,
    setModule: setModule,

    log: log,
    logEmpty: logEmpty,
    logWarn: logWarn,
    logErr: logErr
};
