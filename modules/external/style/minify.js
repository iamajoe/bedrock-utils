/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

var fs = require('fs');
var path = require('path');
var vendor = process.argv[2];
var file = process.argv[3];

// Get modules
var postcss = require(path.join(vendor, 'postcss'));
var cssnano = require(path.join(vendor, 'cssnano'));

// ---------------------------------------------
// Vars

// ---------------------------------------------
// Functions

/**
 * The task method
 * @param  {string} fileSrc
 */
var task = function (fileSrc) {
    var src = fs.readFileSync(fileSrc, 'utf-8');
    var result = postcss([cssnano]).process(src);

    // Write the file now
    fs.writeFileSync(fileSrc, result.css);
};

// ---------------------------------------------
// Runtime

var errPath = path.join(vendor, '../log');
var errFile = path.join(errPath, 'minify_css_error.log');

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
