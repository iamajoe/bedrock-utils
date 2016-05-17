/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

var fs = require('fs');
var path = require('path');
var vendor = process.argv[2];
var opts = process.argv[3];

// Get modules
var webpack = require(path.join(vendor, 'webpack'));

// ---------------------------------------------
// Vars

// ---------------------------------------------
// Functions

/**
 * Check if is array
 * @param  {*} val
 * @return {boolean}
 */
var isArray = function (val) {
    return Object.prototype.toString.call(val) === '[object Array]';
};

/**
 * Converts loaders
 * @param  {array} arr
 * @return {array}
 */
var convertLoaders = function (arr) {
    if (!arr || !arr.length) {
        return arr;
    }

    var presets;
    var loader;
    var i;
    var c;

    for (i = 0; i < loaders[i]; i += 1) {
        loader = loaders[i];
        presets = loader && loader.query && loader.query.presets

        if (loader && loader.test && loader.test.replace('regex:', '') != loader.test) {
            loaders[i].test = new RegExp(loaders[i].test.replace('regex:', ''));
        }

        if (!presets || !presets.length) {
            continue;
        }

        // Now lets resolve the presets
        for (c = 0; c < presets[c]; c += 1) {
            // TODO: What about vendor
            presets[c] = require.resolve(presets[c]);
        }
    }

    return arr;
};

/**
 * Converts plugins
 * @param  {object} obj
 * @return {array}
 */
var convertPlugins = function (obj) {
    if (!obj) {
        return obj;
    }

    var arr = [];

    // Check for dedupe
    if (obj.dedupe) {
        arr.push(new webpack.optimize.DedupePlugin());
    }

    // Check for node env
    if (obj.nodeEnv) {
        arr.push(new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"' + obj.nodeEnv + '"',
            'process.env': {
                'NODE_ENV': JSON.stringify(obj.nodeEnv)
            }
        }));
    }

    return arr;
};

/**
 * Converts string
 * @param  {string} str
 * @return {*}
 */
var convertString = function (str) {
    if (str.replace(/ /g, '') === '') {
        str = null;
    } else if (str === 'true') {
        str = true;
    } else if (str === 'false') {
        str = false;
    } else if (str[0] === '/' && str[str.length - 1] === '/') {
        str = new RegExp(str);
    } else if (str.replace('regex:', '') != str) {
        str = new RegExp(str.replace('regex:', ''));
    } else if (str[0] === '[' && str[str.length - 1] === ']') {
        str = JSON.parse(str);
    } else if (str[0] === '{' && str[str.length - 1] === '}') {
        str = JSON.parse(str);
    }

    return str;
};

/**
 * Converts array
 * @param  {array} arr
 * @return {array}
 */
var convertArray = function (arr) {
    var i;

    if (arr.length === 0) {
        arr = null;
    } else {
        for (i = 0; i < arr.length; i += 1) {
            arr[i] = convert(arr[i]);
        }

        arr = arr.filter(function (val) { return !!val; });
    }

    // Now lets return it
    return arr;
};

/**
 * Converts object
 * @param  {object} obj
 * @return {object}
 */
var convertObj = function (obj) {
    var keys = Object.keys(obj);
    var newObj = {};
    var value;
    var key;
    var i;

    for (i = 0; i < keys.length; i += 1) {
        key = keys[i];
        value = convert(obj[key]);

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
 * Converts
 * @param  {*} value
 * @return {*}
 */
var convert = function (value) {
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
    if (value && typeof value === 'string') {
        value = convertString(value);
    }

    // Finally set the value
    return value;
}

/**
 * The task method
 * @param  {object} options
 */
var task = function (options) {
    options = convert(options);

    // Lets take care of the plugins
    options.plugins = convertPlugins(options.plugins);

    // Bundle!
    var compiler = webpack(options);

    // Run now
    compiler.run(function (err, stats) {
        if (err) {
            throw err;
        }
    });
};

// ---------------------------------------------
// Runtime

task(JSON.parse(opts));
