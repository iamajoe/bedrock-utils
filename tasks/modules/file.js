/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

// Import packages
var gulp = require('gulp');
var Joi = require('joi');
var del = require('del');

var STRUCT = Joi.object().keys({
    src: Joi.string().required(),
    dest: Joi.string()
    // ignore: Joi.string().default('').allow(''),
    // order: Joi.number().default(0),
});

//-------------------------------------
// Functions

/**
 * Deletes
 * @param  {object} task
 * @param  {Function} cb
 */
function clean(task, cb) {
    var srcs = !!task ? [task.src] : [];

    if (!srcs.length) {
        return cb();
    }

    // Lets delete files
    del(srcs, {
        force: true
    }).then(cb.bind(null, null, null));
}

/**
 * Copies
 * @param  {object} task
 * @param  {function} cb
 */
function copy(task, cb) {
    return gulp.src(task.src).pipe(gulp.dest(task.dest))
    .on('end', function () { cb(); });
}

// --------------------------------
// Export

module.exports = { STRUCT: STRUCT, copy: copy, clean: clean };
