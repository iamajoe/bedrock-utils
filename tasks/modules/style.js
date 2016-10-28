/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

// Import packages
var fs = require('fs');
var gulp = require('gulp');
var sass = require('node-sass');
var gulpSass = require('gulp-sass');
var gulpLess = require('gulp-less');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var gulpAutoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var Joi = require('joi');

// TODO: Defaults not working!
var OPTIONS_STRUCT = Joi.object().keys({
    minify: Joi.boolean().default(true),
    autoprefixer: Joi.array().default(['last 2 versions']),
    sourceMap: Joi.boolean().default(false),
    include: Joi.array().items(Joi.string()).default([])
}).default({
    minify: true,
    autoprefixer: ['last 2 versions'],
    sourceMap: false,
    include: []
});

var STRUCT = Joi.object().keys({
    src: Joi.string().required(),
    dest: Joi.string().required(),
    // ignore: Joi.string().default('').allow(''),
    // order: Joi.number().default(0),
    options: OPTIONS_STRUCT
});

//-------------------------------------
// Functions

/**
 * Raw build
 * @param  {object} task
 * @param  {function} cb
 * @return {string}
 */
function rawBuild(task, cb) {
    var css = sass.renderSync({
        file: task.src,
        outputStyle: task.options.minify ? 'compressed' : 'expanded',
        sourceMap: task.options.sourceMap,
        sourceMapEmbed: task.options.sourceMap,
        sourceMapContents: task.options.sourceMap
    }).css;

    // The prefixer...
    if (task.options.autoprefixer && task.options.autoprefixer.length) {
        css = postcss(autoprefixer({
            browsers: task.options.autoprefixer
        })).process(css).css;
    }

    task.dest && fs.writeFileSync(task.dest, css);
    cb();

    return css;
}

/**
 * Gulp build
 * @param  {object}
 * @param  {function} cb
 */
function gulpBuild(task, cb) {
    var gulpTask = gulp.src(task.src);
    var isSass = task.src.replace('.scss', '') !== task.src || task.src.replace('.sass', '') !== task.src;
    var isLess = task.src.replace('.less', '') !== task.src;

    if (isSass) {
        gulpTask = gulpTask.pipe(gulpSass().on('error', gulpSass.logError));
    } else if (isLess) {
        // Nothing to do here...
    } else {
        return;
    }

    if (task.options.sourceMap) {
        gulpTask = gulpTask.pipe(sourcemaps.init());
    }

    if (isSass) {
        gulpTask = gulpTask.pipe(gulpSass({
            outputStyle: task.options.minify ? 'compressed' : 'expanded'
        }).on('error', gulpSass.logError));
    } else if (isLess) {
        gulpTask = gulpTask.pipe(gulpLess());
    }

    if (task.options.sourceMap) {
        gulpTask = gulpTask.pipe(sourcemaps.write());
    }

    if (task.options.autoprefixer.length) {
        gulpTask = gulpTask.pipe(gulpAutoprefixer({
            browsers: task.options.autoprefixer,
            cascade: false
        }));
    }

    return gulpTask.pipe(gulp.dest(task.dest))
    .on('end', function () { cb(); });
}

// --------------------------------
// Export

module.exports = {
    STRUCT: STRUCT,
    OPTIONS_STRUCT: OPTIONS_STRUCT,
    build: gulpBuild,
    raw: rawBuild
};
