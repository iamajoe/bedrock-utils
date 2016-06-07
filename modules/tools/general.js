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

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Check if is array
 * @param  {*} val
 * @return {boolean}
 */
function isArray (val) {
    return Object.prototype.toString.call(val) === '[object Array]';
};

/**
 * Checks if file is a directory
 * @param  {string} src
 * @return {boolean}
 */
function isDirectory(src) {
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
 * Decides what should happen
 * @param  {object} task
 * @param  {number} order
 * @param  {string} env
 * @param  {string} sys
 * @return {object}
 */
function decide(task, order, env, sys) {
    validate.type(
        { task: task, order: order, env: env, sys: sys },
        {
            task: Joi.object(),
            order: Joi.number(),
            env: Joi.string().allow(''),
            sys: Joi.string()
        }
    );

    var taskOrder = task.order;
    var taskEnv = task.env;
    var taskSys = task.sys;

	var mayNotOrder = order != task.order;
	var mayNotEnv = task.env != '' && env != task.env;
	var mayNotSys = task.sys != 'all' && sys != task.sys;

	// Should it continue?
	var shouldContinue = (mayNotOrder || mayNotEnv || mayNotSys);

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
        filePath = path.join(process.cwd(), filePath);
	}

	return filePath;
}

/**
 * Gets glob of files
 * @param  {string} filePath
 * @return {array}
 */
function getGlob(filePath) {
    validate.type(
        { filePath: filePath },
        { filePath: Joi.string() }
    );

    var relative = filePath.replace('/**', '').replace('/*', '');
    var files;

    // TODO: Is glob working for directories??
    if (relative === filePath && isDirectory(filePath)) {
        filePath = path.join(filePath, '/**/*');
    }

    // Lets glob it!
    filePath = getAbsolute(filePath);
    files = glob.sync(filePath);
    files = files.map(function (file) {
        if (isDirectory(file)) {
            return;
        }

        var fileRelative = file.replace(relative, '');
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
 * Ensures that all directories exist
 * @param  {string} filePath
 */
function ensurePath(filePath) {
    validate.type(
        { filePath: filePath },
        { filePath: Joi.string() }
    );

    var dirPath = path.dirname(filePath);
    var data = exec('mkdir -p ' + dirPath);

    if (data.stderr && data.stderr.length) {
        log.logErr('general', data.stderr);
    } else if (data.stdout && data.stdout.length) {
        log.log('general', data.stdout);
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
    ensurePath: ensurePath
};
