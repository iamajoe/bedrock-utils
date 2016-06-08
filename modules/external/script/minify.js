/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var vendor = process.argv[2];
var file = process.argv[3];

// Get modules
var uglifyPath = path.join(vendor, 'uglify-js/bin/uglifyjs');

// ---------------------------------------------
// Vars

// ---------------------------------------------
// Functions

/**
 * The task method
 * @param  {string} fileSrc
 * @param  {string} options
 */
var task = function (fileSrc) {
    // Proceed with command
    var cmd = spawn(uglifyPath, [fileSrc, '-o', fileSrc]);

    cmd.stderr.on('data', function (data) {
        throw data;
    });

    cmd.on('close', function (code) {
        if (code !== 0) {
            throw new Error('Closed and shouldn\'t!');
        }
    });
};

// ---------------------------------------------
// Runtime

var errPath = path.join(vendor, '../log');
var errFile = path.join(errPath, 'minify_js_error.log');

// Remove old error log
if (fs.existsSync(errFile)) {
    fs.unlinkSync(errFile);
}

// Catch the uncaught errors
process.on('uncaughtException', function (err) {
    var data = '';
    data += '///////////////////////////////\nMINIFY ERROR:\n\n';
    data += err;

    // Lets create the log folder if it doesn't exist
    if (!fs.existsSync(errPath)) {
        fs.mkdirSync(errPath);
    }

    fs.writeFileSync(errFile, data, 'utf-8');

    // Now lets error!
    throw err;
});

// Set the task
task(file);
