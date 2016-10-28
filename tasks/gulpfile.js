/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

//-------------------------------------
// Vars / Imports

// Import packages
var fs = require('fs');
var path = require('path');
var argv = require('yargs').argv;
var Joi = require('joi');
var gulp = require('gulp');

// Import modules
var modules = {
    file: require('./modules/file.js'),
    script: require('./modules/script.js'),
    style: require('./modules/style.js'),
    sprite: require('./modules/sprite.js'),
    styleguide: require('./modules/styleguide.js')
};
var tasks = {
    clean: { struct: modules.file.STRUCT, fn: modules.file.clean },
    copy: { struct: modules.file.STRUCT, fn: modules.file.copy },
    script: { struct: modules.script.STRUCT, fn: modules.script.build },
    style: { struct: modules.style.STRUCT, fn: modules.style.build },
    sprite: { struct: modules.sprite.STRUCT, fn: modules.sprite.build },
    styleguide: { struct: modules.styleguide.STRUCT, fn: modules.styleguide.build }
};

var STRUCT = Joi.object().keys({
    projectId: Joi.string().default('projectname'),
    projectName: Joi.string().default('Project Name'),
    tasks: Joi.array().items(Joi.object().keys({
        type: Joi.string().required(),
        env: Joi.string().default('*'),
        data: Joi.array()
    })).default([])
}).required();

var config;

//-------------------------------------
// Functions

/**
 * Gets path
 * @param  {string} src
 * @return {string}
 */
function getPath(src) {
    if (!src) { return; }
    return (src[0] !== '/') ? path.join(process.env.PWD, src) : src;
}

/**
 * Returns file in raw mode
 * @param  {string} pathSrc
 * @return {string}
 */
function readFile(pathSrc) {
    var filename = require.resolve(pathSrc);
    return fs.readFileSync(filename, 'utf8');
}

/**
 * Verify if config is right
 * @param  {object} config
 * @return {boolean}
 */
function verify(config) {
    var result = Joi.validate(config, STRUCT);
    var value = result.value;
    var schema;
    var task;
    var i;
    var c;

    if (result.error) {
        return {
            error: { type: 'root', err: result.error }
        };
    }

    // Lets check data now
    for (i = 0; i < value.tasks.length; i += 1) {
        task = value.tasks[i];
        schema = tasks[task.type].struct;

        for (c = 0; c < task.data.length; c += 1) {
            result = Joi.validate(task.data[c], schema);

            if (result.error) {
                return {
                    error: { type: task.type, msg: result.error }
                };
            } else {
                task.data[c] = result.value;
            }
        }
    }

    return { value: value };
}

/**
 * Gets tasks
 * @param  {object} config
 * @param  {type} type
 * @return {array}
 */
function getTasks(config, type) {
    var projectName = config.projectName;
    var projectId = config.projectId;
    var tasks = config.tasks;
    var internTasks = [];
    var dataTask;
    var c;
    var i;

    // Lets filter!
    tasks = tasks.filter(function (task) {
        var isType = task.type === type;
        var isEnv = task.env === '*' || argv.env === task.env;

        return isType && isEnv;
    }).map(function (task) {
        return task.data;
    });

    // Go per task...
    for (i = 0; i < tasks.length; i += 1) {
        for (c = 0; c < tasks[i].length; c += 1) {
            tasks[i][c].projectId = config.projectId;
            tasks[i][c].projectName = config.projectName;
            tasks[i][c].src = getPath(tasks[i][c].src),
            tasks[i][c].dest = getPath(tasks[i][c].dest)

            internTasks.push(tasks[i][c]);
        }
    }

    return internTasks;
}

/**
 * Set tasks
 * @param {function} fn
 * @param {array} tasks
 * @param {Function} cb
 */
function setTasks(fn, tasks, cb) {
    var cbs = [];

    tasks.forEach(function (task) {
        fn(task, function () {
            cbs.push(1);
            cbs.length === tasks.length && cb();
        });
    });
}

//-------------------------------------
// Runtime

config = readFile(getPath(argv.config));
config = verify(JSON.parse(config));

// Verify config
if (config.error) {
    console.error('Error happened in: ' + config.error.type);
    throw new Error(config.error.msg);
} else {
    config = config.value;
}

// Initialize
gulp.task('project:clean', [], function (cb) {
    setTasks(tasks.clean.fn, getTasks(config, 'clean'), cb);
});

gulp.task('project:styleguide', [], function (cb) {
    setTasks(tasks.styleguide.fn, getTasks(config, 'styleguide'), cb);
});

gulp.task('project:copy', [], function (cb) {
    setTasks(tasks.copy.fn, getTasks(config, 'copy'), cb);
});

gulp.task('project:sprite', [], function (cb) {
    cb();
    // TODO: need to setup
    // setTasks(tasks.sprite.fn, getTasks(config, 'sprite'), cb);
});

gulp.task('project:style', ['project:styleguide', 'project:sprite'], function (cb) {
    setTasks(tasks.style.fn, getTasks(config, 'style'), cb);
});

gulp.task('project:script', [], function (cb) {
    setTasks(tasks.script.fn, getTasks(config, 'script'), cb);
});

// Prepare build for dev
gulp.task('project:build', ['project:clean', 'project:copy', 'project:style', 'project:script'], function (cb) {
    cb();
});
