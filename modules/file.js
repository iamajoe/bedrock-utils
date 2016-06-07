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
    ignore: Joi.string().default(''),
    order: Joi.number().default(0),
    env: Joi.string().allow('').default(''),
    sys: Joi.string().allow('').default('all')
});

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Create task for init
 * @param  {object} config
 * @param  {string} taskType
 * @param  {number} order
 * @param  {string} env
 * @param  {string} sys
 */
function task(config, taskType, order, env, sys) {
    validate.type(
        {
            config: config,
            taskType: taskType,
            order: order,
            env: env,
            sys: sys
        }, {
            config: Joi.array().items(struct),
            taskType: Joi.string(),
            order: Joi.number(),
            env: Joi.string().allow(''),
            sys: Joi.string()
        }
    );

    // Go through each task
    config.forEach(function (task) {
        var shouldContinue = tools.decide(task, order, env, sys);

        if (shouldContinue) {
            return;
        }

        // Get the right paths
        var src = tools.getGlob(task.src, taskType === 'remove');
        var ignore = task.ignore ? tools.getGlob(task.ignore) : [];

        // Lets filter files
        ignore = ignore.map(function (file) {
            return file.relative;
        });
        src = src.filter(function (file) {
            return !tools.arrContainsStr(ignore, file.relative);
        });

        // Go through each in the glob
        src.forEach(function (file) {
            tools.log(taskType, file.relative);

            // Create task
            var newTask = { src: file.absolute };
            var dest;

            if (taskType !== 'remove') {
                dest = path.join(task.dest, file.relative);
                newTask['dest'] = tools.getAbsolute(dest);
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
    validate.type({ file: file }, { file: struct });

    if (tools.notExist(file.src)) {
        return tools.logErr('copy', 'File doesn\'t exist');
    }

    if (tools.isDirectory(file.src)) {
        // We should recursive in case of directory
        task([{
            src: file.src + '/**/*',
            dest: module.dest,
            order: module.order,
            env: module.env,
            sys: module.sys
        }], 'copy', module.order, module.env, module.sys);
    } else {
        // First ensure the path
        tools.ensurePath(file.dest);

        // Remove file if exists
        if (!tools.notExist(file.dest)) {
            remove({ src: file.dest });
        }

        // Now copy the file
        var data = exec('cp ' + file.src + ' ' + file.dest);

        if (data.stderr && data.stderr.length) {
            tools.logErr('copy', data.stderr);
        } else if (data.stdout && data.stdout.length) {
            tools.log('copy', data.stdout);
        }
    }
}

/**
 * Removes * from source
 * @param  {object} file
 */
function remove(file) {
    validate.type({ file: file }, { file: struct });

    var src = file.src.replace(/ /g, '');

    if (src === '.' || src === '' || src === '/') {
        return tools.logErr('remove', 'Trying to remove a global directory!')
    } else if (tools.notExist(src)) {
        return;
    }

    var data = exec('rm -rf ' + src);

    if (data.stderr && data.stderr.length) {
        tools.logErr('remove', data.stderr);
    } else if (data.stdout && data.stdout.length) {
        tools.log('remove', data.stdout);
    }
}

/**
 * Renames * from source to destination
 * @param  {object} file
 */
function rename(file) {
    validate.type({ file: file }, { file: struct });

    if (tools.notExist(src)) {
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
