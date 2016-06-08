'use strict';

// -----------------------------------------
// IMPORTS

var validate = require('./validate.js');
var log = require('./log.js');
var general = require('./general.js');
var fetch = require('./fetch.js');
var npm = require('./npm.js');

// -----------------------------------------
// VARS

// -----------------------------------------
// PUBLIC FUNCTIONS

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = {
    validate: validate,

    setProject: log.setProject,
    setModule: log.setModule,
    log: log.log,
    logEmpty: log.logEmpty,
    logWarn: log.logWarn,
    logErr: log.logErr,

    isArray: general.isArray,
    isDirectory: general.isDirectory,
    notExist: general.notExist,
    arrContainsStr: general.arrContainsStr,
    decide: general.decide,
    getAbsolute: general.getAbsolute,
    getGlob: general.getGlob,
    getFilename: general.getFilename,
    getDir: general.getDir,
    ensurePath: general.ensurePath,

    npmInstall: npm.npmInstall,
    npmFindModules: npm.npmFindModules,
    npmGetDepName: npm.npmGetDepName,

    cloneURL: fetch.cloneURL,
    cloneGit: fetch.cloneGit
};
