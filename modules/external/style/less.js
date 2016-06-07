/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

var fs = require('fs');
var path = require('path');
var vendor = process.argv[2];
var src = process.argv[3];
var dest = process.argv[4];
var opts = process.argv[5];

// Get modules
var less = require(path.join(vendor, 'less'));

// ---------------------------------------------
// Vars

// ---------------------------------------------
// Functions

/**
 * The task method
 * @param  {string} options
 */
var task = function (options) {
    fs.readFile(src, (err, data) => {
        if (err) {
            return cb(err);
        }

        // Compile the less files
        less.render(data.toString(), {
            sourceMap: options.sourceMap ? { sourceMapFileInline: true } : null
        }, function (err, result) {
            if (err) {
                throw err;
            }

            // Write the file now
            fs.writeFileSync(dest, '' + result.css);
        });
    });
};

// ---------------------------------------------
// Runtime

var errPath = path.join(vendor, '../log');
var errFile = path.join(errPath, 'less_error.log');

// Remove old error log
if (fs.existsSync(errFile)) {
    fs.unlinkSync(errFile);
}

// Catch the uncaught errors
process.on('uncaughtException', function(err) {
    var data = '';
    data += '///////////////////////////////\nLESS ERROR:\n\n';
    data += err;

    // Lets create the log folder if it doesn't exist
    if (!fs.existsSync(errPath)) {
        fs.mkdirSync(errPath);
    }

    fs.writeFileSync(errFile, data, 'utf-8');

    // Now lets error!
    throw err;
})

// Set the task
task(JSON.parse(opts));
