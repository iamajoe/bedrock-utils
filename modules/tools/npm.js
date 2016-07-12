'use strict';

// -----------------------------------------
// IMPORTS

var path = require('path');
var exec = require('sync-exec');
var Joi = require('joi');
var validate = require('./validate.js');
var log = require('./log');
var general = require('./general');

// -----------------------------------------
// VARS

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Tries to find a node_modules folder
 * @return {string}
 */
function npmFindModules() {
    var basePath = process.cwd();
    var vendorPath;
    var i;

    // Lets try and find the node_modules
    for (i = 0; i < 5; i += 1) {
        vendorPath = path.join(basePath, 'node_modules');

        if (general.notExist(vendorPath)) {
            basePath = path.join(basePath, '..');
        } else {
            // Found the dir!
            break;
        }
    }

    return vendorPath;
}

/**
 * Get the dependency name
 * @param  {string} dep
 * @return {string}
 */
function npmGetDepName(dep) {
    var i;

    validate.type(
        { dep: dep },
        { dep: Joi.string() }
    );

    i = dep.indexOf('@');
    if (i === -1) {
        i = dep.indexOf('~');
    }
    if (i === -1) {
        i = dep.indexOf('^');
    }
    if (i === -1) {
        i = dep.indexOf('#');
    }
    if (i === -1) {
        i = dep.length;
    }

    return dep.slice(0, i);
}

/**
 * Installs node dependencies
 * @param  {array} deps
 */
function npmInstall(deps) {
    var vendorPath;

    validate.type(
        { deps: deps },
        { deps: Joi.array().items(Joi.string()) }
    );

    vendorPath = npmFindModules();
    deps.forEach(function (dep) {
        var realDep = npmGetDepName(dep);
        var data;

        if (!general.notExist(path.join(vendorPath, realDep))) {
            return;
        }

        // Install
        data = exec('npm install ' + dep);

        if (data.stderr && data.stderr.length) {
            log.logErr(data.stderr);
        } else if (data.stdout && data.stdout.length) {
            log.log(data.stdout);
        }
    });
}

// -----------------------------------------
// EXPORTS

module.exports = {
    npmInstall: npmInstall,
    npmFindModules: npmFindModules,
    npmGetDepName: npmGetDepName
};
