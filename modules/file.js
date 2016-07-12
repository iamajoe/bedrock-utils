'use strict';

// -----------------------------------------
// IMPORTS

var fs = require('fs');
var path = require('path');
var exec = require('sync-exec');
var Joi = require('joi');

var tools = require('./tools/main');
var validate = tools.validate;

// -----------------------------------------
// VARS

var struct = Joi.object().keys({
    src: Joi.string().required(), // `toml:"source"`
    dest: Joi.string().optional(), // `toml:"destination"`
    ignore: Joi.string().default('').allow(''),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    cmd: Joi.string().allow('').default(''),
    sys: Joi.string().allow('').default('all')
});

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Create task for init
 * @param  {object} bedrockObj
 * @param  {object} config
 * @param  {string} taskType
 */
function task(bedrockObj, config, taskType) {
    validate.type(
        { config: config, taskType: taskType },
        { config: Joi.array().items(struct), taskType: Joi.string() }
    );

    // Go through each task
    config.forEach(function (configTask) {
        var shouldContinue = tools.decide(bedrockObj, configTask);
        var ignore;
        var src;

        if (shouldContinue) {
            return;
        }

        // Get the right paths
        src = tools.getGlob(configTask.src, taskType === 'remove', taskType === 'remove');
        ignore = configTask.ignore ? tools.getGlob(configTask.ignore) : [];

        // Lets filter files
        ignore = ignore.map(function (file) {
            return file.relative;
        });
        src = src.filter(function (file) {
            return !tools.arrContainsStr(ignore, file.relative);
        });

        // Go through each in the glob
        src.forEach(function (file) {
            // Create task
            var newTask = { src: file.absolute };
            var dest;

            tools.log(file.relative);

            if (taskType !== 'remove') {
                dest = path.join(configTask.dest, file.relative);
                newTask.dest = tools.getAbsolute(dest);
            }

            switch (taskType) {
            case 'rename':
                rename(newTask);
                break;
            case 'remove':
                remove(newTask);
                break;
            default:
                copy(newTask);
            }
        });
    });
}

/**
 * Copies * from source to destination
 * @param  {object} file
 */
function copy(file) {
    var data;

    validate.type({ file: file }, { file: struct });

    if (tools.notExist(file.src)) {
        return tools.logErr('File doesn\'t exist');
    }

    if (tools.isDirectory(file.src)) {
        // We should recursive in case of directory
        task({
            order: file.order,
            env: file.env,
            cmd: file.cmd,
            sys: file.sys
        }, [{
            src: file.src + '/**/*',
            dest: file.dest,
            order: file.order,
            env: file.env,
            cmd: file.cmd,
            sys: file.sys
        }], 'copy');
    } else {
        // First ensure the path
        tools.ensurePath(file.dest);

        // Remove file if exists
        if (!tools.notExist(file.dest)) {
            remove({ src: file.dest });
        }

        // Now copy the file
        data = exec('cp ' + file.src + ' ' + file.dest);

        if (data.stderr && data.stderr.length) {
            tools.logErr(data.stderr);
        } else if (data.stdout && data.stdout.length) {
            tools.log(data.stdout);
        }
    }
}

/**
 * Removes * from source
 * @param  {object} file
 */
function remove(file) {
    var data;
    var src;

    validate.type({ file: file }, { file: struct });

    src = file.src.replace(/ /g, '');
    if (src === '.' || src === '' || src === '/') {
        return tools.logErr('Trying to remove a global directory!');
    } else if (tools.notExist(src)) {
        return;
    }

    data = exec('rm -rf ' + src);
    if (data.stderr && data.stderr.length) {
        tools.logErr(data.stderr);
    } else if (data.stdout && data.stdout.length) {
        tools.log(data.stdout);
    }
}

/**
 * Renames * from source to destination
 * @param  {object} file
 */
function rename(file) {
    validate.type({ file: file }, { file: struct });

    if (tools.notExist(file.src)) {
        return;
    }

    fs.renameSync(file.src, file.dest);
}

// -----------------------------------------
// PRIVATE FUNCTIONS

// -----------------------------------------
// EXPORTS

module.exports = {
    struct: struct,
    task: task,
    copy: copy,
    remove: remove,
    rename: rename
};
