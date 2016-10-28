/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

// Import packages
var path = require('path');
var Joi = require('joi');
var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');

var PLUGIN_STRUCT = Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    args: Joi.array().default([])
});

var RESOLVE_STRUCT = Joi.object().keys({
    alias: Joi.array().items(Joi.string()).default([]),
    root: Joi.array().items(Joi.string()).default([]),
    modulesDirectories: Joi.array().items(Joi.string()).default([
        './node_modules', './src'
    ]),
    fallback: Joi.array().items(Joi.string()).default([]),
    extensions: Joi.array().items(Joi.string().allow('')).default(['', '.js']),
    packageMains: Joi.array().items(Joi.string()).default([]),
    packageAlias: Joi.string(),
    unsafeCache: Joi.array().items(Joi.string()).default([]),
    moduleTemplates: Joi.array().items(Joi.string()).default([])
}).default({
    extensions: ['', '.js'],
    modulesDirectories: ['./node_modules', './src'],

    alias: [], root: [], fallback: [],
    packageMains: [], unsafeCache: [], moduleTemplates: []
});

var LOADER_STRUCT = Joi.object().keys({
    test: Joi.string(),
    exclude: Joi.string(),
    include: Joi.array().items(Joi.string()).default([]),
    loader: Joi.string(),
    loaders: Joi.array().items(Joi.string()).default([]),
    query: Joi.string()
}).default({});

var MODULE_STRUCT = Joi.object().keys({
    preLoaders: Joi.array().items(LOADER_STRUCT).default([]),
    loaders: Joi.array().items(LOADER_STRUCT).default([{
        test: /\.json?$/,
        loader: 'json-loader',
        exclude: /(node_modules|bower_components)/
    }, {
        test: /\.html?$/,
        loader: 'raw-loader',
        exclude: /(node_modules|bower_components)/
    }]),
    postLoaders: Joi.array().items(LOADER_STRUCT).default([]),
    noParse: Joi.array().items(Joi.string()).default([]),
    unknownContextRegExp: Joi.string(),
    unknownContextCritical: Joi.boolean(),
    exprContextRegExp: Joi.string(),
    exprContextCritical: Joi.boolean(),
    wrappedContextRegExp: Joi.string(),
    wrappedContextCritical: Joi.boolean()
}).default({
    preLoaders: [], loaders: [], postLoaders: [], noParse: []
});

var OUTPUT_STRUCT = Joi.object().keys({
    filename: Joi.string().default('app.js'),
    path: Joi.string(),
    publicPath: Joi.string(),
    chunkFilename: Joi.string(),
    sourceMapFilename: Joi.string(),
    devtoolModuleFilenameTemplate: Joi.string(),
    devtoolFallbackModuleFilenameTemplate: Joi.string(),
    devtoolLineToLine: Joi.boolean(),
    hotUpdateChunkFilename: Joi.string(),
    hotUpdateMainFilename: Joi.string(),
    jsonpFunction: Joi.string(),
    hotUpdateFunction: Joi.string(),
    pathinfo: Joi.boolean(),
    library: Joi.string(),
    libraryTarget: Joi.string(),
    umdNamedDefine: Joi.boolean(),
    sourcePrefix: Joi.string(),
    crossOriginLoading: Joi.string()
}).default({
    filename: 'app.js'
});

var OPTIONS_STRUCT = Joi.object().keys({
    // Webpack related
    context: Joi.string(),
    entry: Joi.string(),
    output: OUTPUT_STRUCT,
    module: MODULE_STRUCT,
    resolve: RESOLVE_STRUCT,
    resolveLoader: RESOLVE_STRUCT,
    externals: Joi.object().default({}),
    target: Joi.string().default('web'),
    bail: Joi.boolean().default(true),
    profile: Joi.boolean(),
    cache: Joi.boolean().default(true),
    debug: Joi.boolean().default(false),
    devtool: Joi.string().default(''),
    devServer: Joi.string(),
    node: Joi.string(),
    amd: Joi.string(),
    loader: Joi.string(),
    recordsPath: Joi.string(),
    recordsInputPath: Joi.string(),
    recordsOutputPath: Joi.string(),
    plugins: Joi.array().items(PLUGIN_STRUCT).default([])
}).default({
    target: 'web',
    bail: true,
    cache: true,
    debug: false,
    externals: [], plugins: []
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

// It will be defined later
var convert;

/**
 * Check if is array
 * @param  {*} val
 * @return {boolean}
 */
function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
}

/**
 * Converts string
 * @param  {string} str
 * @return {*}
 */
function convertString(str) {
    if (str[0] === '/' && str[str.length - 1] === '/') {
        str = str.slice(1, str.length - 1);
        str = new RegExp(str);
    } else if (str.replace('regex:', '') !== str) {
        str = new RegExp(str.replace('regex:', ''));
    }

    return str;
}

/**
 * Converts array
 * @param  {array} arr
 * @return {array}
 */
function convertArray(arr) {
    var i;

    if (arr.length === 0) {
        arr = null;
    } else {
        for (i = 0; i < arr.length; i += 1) {
            arr[i] = convert(arr[i]);
        }
    }

    // Now lets return it
    return arr;
}

/**
 * Converts object
 * @param  {object} obj
 * @return {object}
 */
function convertObj(obj) {
    var keys = Object.keys(obj);
    var newObj = {};
    var value;
    var key;
    var i;

    for (i = 0; i < keys.length; i += 1) {
        key = keys[i];

        // Some keys can't be converted because it needs the empty string ""
        if (key === 'Extensions') {
            value = obj[key];
        } else {
            // Lets convert
            value = convert(obj[key]);
        }

        // Finally set the value
        if (!!value || typeof value === 'boolean') {
            key = key.charAt(0).toLowerCase() + key.slice(1);
            newObj[key] = value;
        }
    }

    // Finally the right object
    return newObj;
}

/**
 * Converts plugins
 * @param  {object} list
 * @return {array}
 */
function convertPlugins(list) {
    var arr = [];
    var PluginReq;
    var plugin;
    var args;
    var i;

    if (!list) {
        return list;
    }

    // Set the plugin list
    for (i = 0; i < list.length; i += 1) {
        plugin = list[i];
        args = plugin.args || [];

        // Specifics
        if (plugin.name === 'define') {
            plugin = new webpack.DefinePlugin(args[0], args[1], args[2], args[3]);
        } else if (plugin.name === 'dedupe') {
            plugin = new webpack.optimize.DedupePlugin();
        } else if (plugin.name === 'provide') {
            plugin = new webpack.ProvidePlugin(args[0], args[1], args[2], args[3]);
        } else if (plugin.name === 'uglify') {
            plugin = new webpack.optimize.UglifyJsPlugin(args[0]);
        } else {
            // Require the dependency
            PluginReq = require(plugin.name);

            if (plugin.type === 'function') {
                plugin = PluginReq;
            } else {
                plugin = new PluginReq(args[0], args[1], args[2], args[3]);
            }
        }

        // Add to the array
        arr.push(plugin);
    }

    return arr;
}

/**
 * Converts
 * @param  {*} value
 * @return {*}
 */
convert = function (value) {
    // We may need to reiterate
    if (value && typeof value === 'object') {
        if (isArray(value)) {
            value = convertArray(value);
        } else {
            value = convertObj(value);

            if (Object.keys(value).length === 0) {
                value = null;
            }
        }
    }

    // No need to set string if empty
    if (typeof value === 'string') {
        value = convertString(value);
    }

    // Finally set the value
    return value;
};

/**
 * Raw build
 * @param  {object} task
 * @param  {function} cb
 */
function rawBuild(task, cb) {
    var options;

    // Lets take care of the options for webpack
    options = convert(task.options);
    options.plugins = convertPlugins(options.plugins);

    // Set entry
    options.entry = task.src;
    options.output.path = path.dirname(task.dest);
    options.output.filename = path.basename(task.dest);

    // Finally compile!
    webpack(options, cb || function (err) {
        if (err) {
            throw new Error(err);
        }
    });
}

/**
 * Gulp build
 * @param  {object} task
 * @param  {function} cb
 */
function gulpBuild(task, cb) {
    var options;

    // Lets take care of the options for webpack
    options = convert(task.options);
    options.plugins = convertPlugins(options.plugins);

    return gulp.src(task.src)
    .pipe(gulpWebpack(options))
    .pipe(gulp.dest(task.dest))
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
