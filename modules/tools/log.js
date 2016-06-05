'use strict';

// -----------------------------------------
// IMPORTS

var colors = require('colors/safe');
var check = require('./check');

// -----------------------------------------
// VARS

var projectName = 'project';

// -----------------------------------------
// PUBLIC FUNCTIONS

// Log a string
function log(module, str) {
    check.validate(
        { module: module, str: str },
        { module: check.Joi.string(), str: check.Joi.string() }
    );

    if (str.replace(/ /g, '') === '') {
        return;
    }

    var project = colors.bgBlack.white('[' + projectName + '] ');
    var module = colors.bgBlack.green('[' + module + '] ');

    console.log(project + module + str);
}

// LogEmpty logs without module
function logEmpty(str) {
    check.validate(
        { str: str },
        { str: check.Joi.string() }
    );

    if (str.replace(/ /g, '') === '') {
        return;
    }

    var project = colors.bgBlack.white('[' + projectName + '] ');
    var module = colors.bgBlack.cyan('[' + module + '] ');

    console.log(project + module + str);
}

// LogWarn logs a warn
function logWarn(module, str) {
    check.validate(
        { module: module, str: str },
        { module: check.Joi.string(), str: check.Joi.string() }
    );

    if (str.replace(/ /g, '') === '') {
        return;
    }

    var project = colors.bgBlack.white('[' + projectName + '] ');
    var type = colors.bold.bgBlack.yellow('[warn] ');
    var module = colors.bgBlack.yellow('[' + module + '] ');

    console.warn(project + type + module + str);
}

// LogErr logs an error
function logErr(module, err) {
    check.validate(
        { module: module, err: err },
        { module: check.Joi.string(), err: check.Joi.string() }
    );

    if (err.replace(/ /g, '') === '') {
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
