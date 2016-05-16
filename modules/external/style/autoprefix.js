/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

var fs = require('fs');
var path = require('path');
var vendor = process.argv[2];
var file = process.argv[3];
var opts = process.argv[4];

// Get modules
var postcss = require(path.join(vendor, 'postcss'));
var autoprefixer = require(path.join(vendor, 'autoprefixer'));

// ---------------------------------------------
// Vars

// ---------------------------------------------
// Functions

/**
 * The task method
 * @param  {string} fileSrc
 * @param  {string} options
 */
var task = function (fileSrc, options) {
    var autoprefixerOpts = autoprefixer({ browsers: options });
    var src = fs.readFileSync(fileSrc, 'utf-8');
    var result = postcss(autoprefixerOpts).process(src);

    // Write the file now
    fs.writeFileSync(fileSrc, result.css);
};

// ---------------------------------------------
// Runtime

task(file, opts);
