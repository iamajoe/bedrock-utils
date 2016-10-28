/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

// Import packages
var path = require('path');
var Joi = require('joi');
var gulp = require('gulp');
var gulpSpritesmith = require('gulp.spritesmith');
var gulpSvgSprite = require('gulp-svg-sprites');
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
    var dest = task.dest;
    var imgStream;
    var cssStream;

    if (isImage) {
        gulpTask = gulpTask.pipe(gulpSpritesmith({
            imgName: path.basename(dest),
            cssName: path.basename(task.options.style),
            cssTemplate: getPath(task.options.styleTemplate) || path.resolve(SPRITE_TEMPLATE),
            padding: 1
        }));

        // Lets take care of image
        imgStream = gulpTask.img
        // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest(path.dirname(dest)));

        // Lets take care of css
        cssStream = gulpTask.css
        .pipe(gulp.dest(path.dirname(task.options.style)));

        // Return a merged stream to handle both `end` events
        return merge(imgStream, cssStream)
        .on('end', function () { cb(); });
    } else if (isSvg) {
        gulpTask = gulpTask.pipe(gulpSvgSprite({ mode: 'defs' }));

        if (path.basename(dest) === 'svg') {
            dest = path.dirname(dest);
        }

        return gulpTask.pipe(gulp.dest(dest))
        .on('end', function () { cb(); });
    }
}

// --------------------------------
// Export

module.exports = {
    STRUCT: STRUCT,
    build: gulpBuild
};
