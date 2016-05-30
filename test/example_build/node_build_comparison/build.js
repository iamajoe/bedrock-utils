/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

/* eslint-disable no-var */
var fs = require('fs-extra');
var path = require('path');
var Promise = require('bluebird');
var exec = require('child_process').exec;
var env = process.argv[2];
var rmPromise = Promise.promisify(fs.remove);

var cwd = process.cwd();
var tasksPath = path.join(cwd, 'node_modules', 'bedrock/tasks');
var srcPath = path.join(cwd, '../src');
var buildPath = path.join(cwd, 'build');

var newPromise;
var bundlerFn;
var logTask;
var copyFn;
var cssFn;
/* eslint-enable no-var */

/**
 * Log the task
 * @param  {string} task
 */
logTask = function (task) {
    var taskCmLine = '';

    // Lets create the comment line
    while (taskCmLine.length < 60) {
        taskCmLine += '#';
    }

    /* eslint-disable no-console */
    console.log(`\n${taskCmLine}\n# ${task} \n${taskCmLine}\n`);
    /* eslint-enable no-console */
};

/**
 * Sets a new promise
 * @return {promise}
 */
newPromise = function () {
    var promise = new Promise(function (resolve) {
        resolve();
    });

    return promise;
}

/**
 * File function
 * @return {promise}
 */
copyFn = function () {
    return newPromise()
    // Remove old files
    .then(function () {
        logTask('Remove old files');
    })
    .then(function () {
        return rmPromise(path.join(buildPath, '*.php'));
    })
    // Run file task
    .then(function () {
        logTask('Run file tasks');
    })
    .then(function () {
        var fileTask = require(path.join(tasksPath, 'file.js'));
        var files = [
            {
                cwd: srcPath,
                src: '*.php',
                dest: buildPath
            }, {
                cwd: path.join(srcPath, 'inc'),
                src: '*.php',
                dest: path.join(buildPath, 'inc')
            }, {
                cwd: path.join(srcPath, 'components'),
                src: '*.php',
                dest: path.join(buildPath, 'components')
            }
        ];

        return fileTask(files, buildPath);
    });
};

/**
 * Css env function
 * @return {promise}
 */
cssFn = function () {
    return newPromise()
    // Remove old files
    .then(function () {
        logTask('Remove old style files');
    })
    .then(function () {
        rmPromise(path.join(buildPath, '*.css'));
    })
    // Run style task
    .then(function () {
        logTask('Run style tasks');
    })
    .then(function () {
        var fileTask = require(path.join(tasksPath, 'style.js'));
        var files = [{
            src: path.join(srcPath, 'style.scss'),
            dest: path.join(buildPath, 'app.css')
        }];

        return fileTask(files);
    });
};

/**
 * Bundler env function
 * @return {promise}
 */
bundlerFn = function () {
    return newPromise()
    // Remove old files
    .then(function () {
        logTask('Remove old bundler files');
    })
    .then(function () {
        rmPromise(path.join(buildPath, '*.js'));
    })
    // Run bundler task
    .then(function () {
        logTask('Run bundler tasks');
    })
    .then(function () {
        var fileTask = require(path.join(tasksPath, 'bundler.js'));
        var files = [{
            entry: [ path.join(srcPath, 'bootstrap.js') ],
            output: { path: buildPath }
        }];

        return fileTask(files);
    })
    // Run style task
    .then(cssFn);
};

/**
* Take care of running the task
*/
newPromise()
// Set the tasks per env
.then(bundlerFn)
.then(copyFn)
// Force to exit the process
.then(process.exit);
