'use strict';

// -----------------------------------------
// IMPORTS

var path = require('path');
var exec = require('sync-exec');
var check = require('./check');
var log = require('./log');
var general = require('./general');

// -----------------------------------------
// VARS

// -----------------------------------------
// PUBLIC FUNCTIONS

// NpmInstall installs node dependencies
function npmInstall(deps, cmdDir) {
    check.validate(
        { deps: deps, cmdDir: cmdDir },
        { deps: check.Joi.array().items(check.Joi.string()), cmdDir: check.Joi.string() }
    );

    var vendorPath = npmFindModules(cmdDir);

    deps.forEach(function (dep) {
        var realDep = npmGetDepName(dep);
        var data;

        if (general.notExist(path.join(vendorPath, realDep))) {
            return;
        }

        // Install
        data = exec('npm install ' + dep);

        if (data.stderr && data.stderr.length) {
            log.logErr('npm', data.stderr);
        } else if (data.stdout && data.stdout.length) {
            log.log('npm', data.stdout);
        }
    });
}

// NpmFindModules tries to find a node_modules folder
function npmFindModules(cmdDir) {
    check.validate(
        { cmdDir: cmdDir },
        { cmdDir: check.Joi.string() }
    );

    var basePath = cmdDir;
    var vendorPath;
    var dirFound;
    var i;

    // Lets try and find related to the CmdDir
    for (i = 0; i < 5; i += 1) {
        vendorPath = path.join(basePath, 'node_modules');

        if (general.notExist(vendorPath)) {
            basePath = path.join(basePath, '..');
        } else {
            dirFound = true;
            break
        }
    }

    if (dirFound) {
        return vendorPath;
    }

    // Lets try and find related to the working dir
    basePath = process.cwd();

    for (i = 0; i < 5; i += 1) {
        vendorPath = path.join(basePath, 'node_modules');

        if (general.notExist(vendorPath)) {
            basePath = path.join(basePath, '..');
        } else {
            dirFound = true;
            break
        }
    }

    return vendorPath;
}

// NpmGetDepName returns the dependency name
function npmGetDepName(dep) {
    check.validate(
        { dep: dep },
        { dep: check.Joi.string() }
    );

    var i = dep.indexOf('@');
    if (i === -1) {
        i = dep.indexOf('~');
    }
    if (i === -1) {
        i = dep.indexOf('^');
    }
    if (i === -1) {
        i = dep.length;
    }

    return dep.slice(0, i);
}

// -----------------------------------------
// EXPORTS

module.exports = {
    npmInstall: npmInstall,
    npmFindModules: npmFindModules,
    npmGetDepName: npmGetDepName
};
