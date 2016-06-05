'use strict';

// -----------------------------------------
// IMPORTS

var check = require('./check');
var log = require('./log');
var general = require('./general');
var fetch = require('./fetch');
var npm = require('./npm');

// -----------------------------------------
// VARS

// -----------------------------------------
// PUBLIC FUNCTIONS

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = {
    check: check,

    log: log.log,
    logEmpty: log.logEmpty,
    logWarn: log.logWarn,
    logErr: log.logErr,

    arrContainsStr: general.arrContainsStr,
    initDecision: general.initDecision,
    getPaths: general.getPaths,
    constructDest: general.constructDest,
    notExist: general.notExist,
    getAbsolute: general.getAbsolute,
    getGlob: general.getGlob,
    getFilename: general.getFilename,
    ensurePath: general.ensurePath,

    npmInstall: npm.npmInstall,
    npmFindModules: npm.npmFindModules,
    npmGetDepName: npm.npmGetDepName,

    cloneURL: fetch.cloneURL,
    cloneGit: fetch.cloneGit
};
