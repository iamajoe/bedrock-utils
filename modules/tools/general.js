'use strict';

// -----------------------------------------
// IMPORTS

var fs = require('fs');
var path = require('path');
var exec = require('sync-exec');
var glob = require('glob');
var Joi = require('joi');
var validate = require('./validate.js');
var log = require('./log');

// -----------------------------------------
// VARS

var wd = '.';
var basePath = '.';

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Sets base path to be used
 * @param {string} str
 */
function setWd(str) {
    wd = str;
}

/**
 * Sets base path to be used
 * @param {string} str
 */
function setBasePath(str) {
    basePath = str;
}

/**
 * Checks if file exists
 * @param  {string} src
 * @return {boolean}
 */
function notExist(src) {
    validate.type(
        { src: src },
        { src: Joi.string() }
    );

    return src !== '' ? !fs.existsSync(src) : false;
}

/**
 * Check if is array
 * @param  {*} val
 * @return {boolean}
 */
function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
}

/**
 * Checks if file is a directory
 * @param  {string} src
 * @return {boolean}
 */
function isDirectory(src) {
    if (notExist(src)) {
        return;
    }

    return fs.lstatSync(src).isDirectory();
}

/**
 * Checks if an array contains a string
 * @param  {array} arr
 * @param  {string} str
 * @return {boolean}
 */
function arrContainsStr(arr, str) {
    validate.type(
        { arr: arr, str: str },
        { arr: Joi.array().items(Joi.string()), str: Joi.string() }
    );

    return arr.filter(function (val) {
        return val === str;
    }).length;
}

/**
 * Decides what should happen
 * @param  {object} bedrockObj
 * @param  {object} task
 * @return {object}
 */
function decide(bedrockObj, task) {
    var shouldContinue;
    var mayNotOrder;
    var mayNotEnv;
    var mayNotCmd;
    var mayNotSys;

    mayNotOrder = bedrockObj.order !== task.order;
    mayNotEnv = task.env !== '' && bedrockObj.env !== task.env;
    mayNotCmd = task.cmd !== '' && bedrockObj.cmd !== task.cmd;
    mayNotSys = task.sys !== 'all' && bedrockObj.sys !== task.sys;

	// Should it continue?
    shouldContinue = (mayNotOrder || mayNotEnv || mayNotCmd || mayNotSys);

    return shouldContinue;
}

/**
 * Gets absolute path
 * @param  {string} filePath
 * @return {string}
 */
function getAbsolute(filePath) {
    validate.type(
        { filePath: filePath },
        { filePath: Joi.string() }
    );

    if (filePath[0] !== '/') {
        filePath = path.join(wd, basePath, filePath);
    }

    return filePath;
}

/**
 * Gets glob of files
 * @param  {string} filePath
 * @param  {boolean} alsoDir
 * @param  {boolean} dontGlobDir
 * @return {array}
 */
function getGlob(filePath, alsoDir, dontGlobDir) {
    var relative;
    var files;
    var relI;

    validate.type(
        { filePath: filePath, alsoDir: alsoDir },
        { filePath: Joi.string(), alsoDir: Joi.boolean().optional() }
    );

    filePath = filePath.replace(/ /g, '');

    // Lets take care of the relative
    relative = filePath;
    relI = relative.indexOf('**');
    while (relI !== -1) {
        relative = relative.slice(0, relI);
        relI = relative.indexOf('**');
    }

    relI = relative.indexOf('*');
    while (relI !== -1) {
        relative = relative.slice(0, relI);
        relI = relative.indexOf('*');
    }

    // Directory globbing
    if (relative === filePath && isDirectory(filePath) && !dontGlobDir) {
        filePath = path.join(filePath, '/**/*');
    }

    // Lets glob it!
    filePath = getAbsolute(filePath);
    files = glob.sync(filePath);
    files = files.map(function (file) {
        var fileRelative = '';
        var index;

        if (!alsoDir && isDirectory(file)) {
            return;
        }

        // Try to find the right relative
        fileRelative = file;
        index = fileRelative.indexOf(relative);
        while (index !== -1 && relative.length) {
            fileRelative = fileRelative.slice(index + relative.length, file.length);
            index = fileRelative.indexOf(relative);
        }
        fileRelative = !fileRelative.length ? '.' : fileRelative;

        return {
            relative: fileRelative,
            original: filePath,
            absolute: file
        };
    }).filter(function (val) {
        return !!val;
    });

    return files;
}

/**
 * Gets filename
 * @param  {string} filePath
 * @return {string}
 */
function getFilename(filePath) {
    validate.type(
        { filePath: filePath },
        { filePath: Joi.string() }
    );

    return path.basename(filePath);
}

/**
 * Gets directory
 * @param  {string} filePath
 * @return {string}
 */
function getDir(filePath) {
    validate.type(
        { filePath: filePath },
        { filePath: Joi.string() }
    );

    return path.dirname(filePath);
}

/**
 * Ensures that all directories exist
 * @param  {string} filePath
 */
function ensurePath(filePath) {
    var dirPath;
    var data;

    validate.type(
        { filePath: filePath },
        { filePath: Joi.string() }
    );

    dirPath = getDir(filePath);
    data = exec('mkdir -p ' + dirPath);

    if (data.stderr && data.stderr.length) {
        log.logErr(data.stderr);
    } else if (data.stdout && data.stdout.length) {
        log.log(data.stdout);
    }
}

// -----------------------------------------
// EXPORTS

module.exports = {
    isArray: isArray,
    isDirectory: isDirectory,
    notExist: notExist,
    arrContainsStr: arrContainsStr,
    decide: decide,
    getAbsolute: getAbsolute,
    getGlob: getGlob,
    getFilename: getFilename,
    getDir: getDir,
    ensurePath: ensurePath,
    setBasePath: setBasePath,
    setWd: setWd
};
