'use strict';

// -----------------------------------------
// IMPORTS

var fs = require('fs');
var path = require('path');
var exec = require('sync-exec');
var glob = require('glob');
var check = require('./check');
var log = require('./log');

// -----------------------------------------
// VARS

// -----------------------------------------
// PUBLIC FUNCTIONS

// ArrContainsStr checks if an array contains a string
function arrContainsStr(arr, str) {
    check.validate(
        { arr: arr, str: str },
        { arr: check.Joi.array().items(check.Joi.string()), str: check.Joi.string() }
    );

	return arr.filter(function (val) {
        return val === str;
    }).length;
}

// InitDecision decides what should happen
function initDecision(taskOrder, taskEnv, taskSys, order, env, sys) {
    check.validate(
        { taskOrder: taskOrder, taskEnv: taskEnv, taskSys: taskSys, order: order, env: env, sys: sys },
        {
            taskOrder: check.Joi.number(),
            taskEnv: check.Joi.string(),
            taskSys: check.Joi.string(),
            order: check.Joi.number(),
            env: check.Joi.string(),
            sys: check.Joi.string()
        }
    );

	taskEnv = taskEnv === '' ? 'both' : taskEnv;
    taskSys = taskSys === '' ? 'all' : taskSys;

	var mayNotOrder = order != taskOrder;
	var mayNotEnv = taskEnv != 'both' && env != taskEnv;
	var mayNotSys = taskSys != 'all' && sys != taskSys;

	// Should it continue?
	var shouldContinue = (mayNotOrder || mayNotEnv || mayNotSys);

	return {
        taskOrder: taskOrder,
        taskEnv: taskEnv,
        taskSys: taskSys,
        shouldContinue: shouldContinue
    };
}

// GetPaths gets right paths
function getPaths(srcToPath, ignoreToPath) {
    check.validate(
        { srcToPath: srcToPath, ignoreToPath: ignoreToPath },
        { srcToPath: check.Joi.string(), ignoreToPath: check.Joi.string() }
    );

	// Initialize vars
    var ignore;
	var src;

	if (srcToPath !== '') {
		src = getGlob(getAbsolute(srcToPath));
	}

	if (ignoreToPath !== '') {
		ignore = getGlob(getAbsolute(ignoreToPath));
	}

	return {
        src: src,
        ignore: ignore
    };
}

// ConstructDest constructs dest path
function constructDest(module, dest, src) {
    check.validate(
        { module: module, dest: dest, src: src },
        { module: check.Joi.string(), dest: check.Joi.string(), src: check.Joi.string() }
    );

	if (dest === '') {
		return dest;
	}

	// Check if it goes to a directory
	if (dest[dest.length - 1] === '/') {
		dest = dest + getFilename(src);
	}

	// Ensure directory exists
	if (module !== 'remove') {
		ensurePath(dest);
	}

	return getAbsolute(dest);
}

// NotExist checks if file exists
function notExist(src) {
    check.validate(
        { src: src },
        { src: check.Joi.string() }
    );

	return src !== '' ? fs.existsSync(src) : false;
}

// GetAbsolute gets absolute path
function getAbsolute(filePath) {
    check.validate(
        { filePath: filePath },
        { filePath: check.Joi.string() }
    );

	if (filePath[0] !== '/') {
        filePath = path.join(process.cwd(), filePath);
	}

	return filePath;
}

// GetGlob gets glob of files
function getGlob(filePath) {
    check.validate(
        { filePath: filePath },
        { filePath: check.Joi.string() }
    );

	// Get all matching
    var files = glob.sync(filePath);

	return files;
}

// GetFilename gets filename
function getFilename(filePath) {
    check.validate(
        { filePath: filePath },
        { filePath: check.Joi.string() }
    );

	return path.basename(filePath);
}

// EnsurePath ensures that all directories exist
function ensurePath(filePath) {
    check.validate(
        { filePath: filePath },
        { filePath: check.Joi.string() }
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
    arrContainsStr: arrContainsStr,
    initDecision: initDecision,
    getPaths: getPaths,
    constructDest: constructDest,
    notExist: notExist,
    getAbsolute: getAbsolute,
    getGlob: getGlob,
    getFilename: getFilename,
    ensurePath: ensurePath
};
