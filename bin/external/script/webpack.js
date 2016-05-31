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
// var convertLoaders = function (arr) {
//     if (!arr || !arr.length) {
//         return arr;
//     }

//     var presets;
//     var loader;
//     var i;
//     var c;

//     for (i = 0; i < loaders[i]; i += 1) {
//         loader = loaders[i];
//         presets = loader && loader.query && loader.query.presets

//         if (loader && loader.test && loader.test.replace('regex:', '') != loader.test) {
//             loaders[i].test = new RegExp(loaders[i].test.replace('regex:', ''));
//         }

//         if (!presets || !presets.length) {
//             continue;
//         }

//         // Now lets resolve the presets
//         for (c = 0; c < presets[c]; c += 1) {
//             // TODO: What about vendor
//             presets[c] = require.resolve(presets[c]);
//         }
//     }

//     return arr;
// };

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
 * Converts entry
 * @param  {*} value
 * @return {*}
 */
var convertEntry = function (value) {
    // Remove the extension
    var strConv = function (str) {
        if (str.slice(str.length - 3, str.length) === '.js') {
            str = str.slice(0, str.length - 3);
        }

        return str;
    };
    var keys;
    var i;

    if (!value) {
        return value;
    }

    // It depends on the type of value
    if (isArray(value) && value.length) {
        for (i = 0; i < value.length; i += 1) {
            value[i] = strConv(value[i]);
        }
    } else if (typeof value === 'object' && Object.keys(value).length) {
        keys = Object.keys(value);
        for (i = 0; i < keys.length; i += 1) {
            value[keys[i]] = strConv(value[keys[i]]);
        }
    } else if (typeof value === 'string' && value !== '') {
        value = strConv(value);
    }

    return value;
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
        str = str.slice(1, str.length - 1);
        str = new RegExp(str);
    } else if (str.replace('regex:', '') !== str) {
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

        // Some keys can't be converted because it needs the empty string ""
        if (key === 'Extensions' ) {
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
};

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
};

/**
 * The task method
 * @param  {object} options
 */
var task = function (options) {
    // Lets take care of the options for webpack
    var optionsWP = convert(options);
    optionsWP.entry = convertEntry(optionsWP.entry);
    optionsWP.plugins = convertPlugins(optionsWP.plugins);

    // Bundle!
    var compiler = webpack(optionsWP);

    // Run now
    compiler.run(function (err, stats) {
        if (err) {
            throw err;
        }
    });
};

// ---------------------------------------------
// Runtime

var errPath = path.join(vendor, '../log/webpack_error.log');

// Remove old error log
if (fs.existsSync(errPath)) {
    fs.unlinkSync(errPath);
}

// Catch the uncaught errors
process.on('uncaughtException', function(err) {
    var data = '';
    data += '///////////////////////////////\nWEBPACK ERROR:\n\n';
    data += err;
    data += '\n\n///////////////////////////////\nWEBPACK OPTIONS:\n\n';
    data += JSON.stringify(convert(JSON.parse(opts)), null, 4);
    fs.writeFileSync(errPath, data, 'utf-8');

    // Now lets error!
    throw err;
})

// Set the task
task(JSON.parse(opts));
