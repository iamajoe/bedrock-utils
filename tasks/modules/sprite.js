/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

// Import packages
var path = require('path');
var Joi = require('joi');
var gulp = require('gulp');
var gulpSpritesmith = require('gulp.spritesmith');
var through = require('through2');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var buffer = require('vinyl-buffer');

var OPTIONS_STRUCT = Joi.object().keys({
    style: Joi.string(),
    styleTemplate: Joi.string()
}).default({});

var STRUCT = Joi.object().keys({
    src: Joi.string().required(),
    dest: Joi.string().required(),
    // ignore: Joi.string().default('').allow(''),
    // order: Joi.number().default(0),
    options: OPTIONS_STRUCT
});

var SPRITE_TEMPLATE = './_assets/sprite_template.css.handlebars';

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
 * Initialize tasks
 * @param  {object} task
 * @param  {function} cb
 */
function gulpBuild(task, cb) {
    var gulpTask = gulp.src(task.src);
    var isSvg = task.src.replace('.svg', '') !== task.src;
    var isImage = task.src.replace('.png', '') !== task.src || task.src.replace('.jpg', '') !== task.src;
    var imgStream;
    var cssStream;

    if (isImage) {
        gulpTask = gulpTask.pipe(gulpSpritesmith({
            imgName: path.basename(task.dest),
            cssName: path.basename(task.options.style),
            cssTemplate: getPath(task.options.styleTemplate) || path.resolve(SPRITE_TEMPLATE),
            padding: 1
        }));

        // Lets take care of image
        imgStream = task.img
        // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest(path.dirname(task.dest)));

        // Lets take care of css
        cssStream = task.css
        .pipe(gulp.dest(path.dirname(task.options.style)));

        // Return a merged stream to handle both `end` events
        return merge(imgStream, cssStream);
    } else if (isSvg) {
        // TODO: We need to take care of svg
        gulpTask.pipe(through.obj(function (chunk, enc, cb) {
            // TODO: We need to read it and template...
            // console.log('chunk', chunk.path) // this should log now
            cb(null, chunk);
        }));

        return;
    } else {
        return;
    }

    return gulpTask.pipe(gulp.dest(task.dest))
    .on('end', function () { cb(); });
}

// --------------------------------
// Export

module.exports = {
    STRUCT: STRUCT,
    build: gulpBuild
};
