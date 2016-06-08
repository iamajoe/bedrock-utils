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

var entryDir;

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
 * Converts plugins
 * @param  {object} list
 * @return {array}
 */
var convertPlugins = function (list) {
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
        } else {
            // Require the dependency
            PluginReq = require(path.join(vendor, plugin.name));

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
    if (str === 'true') {
        str = true;
    } else if (str === 'false') {
        str = false;
    } else if (str[0] === '[' && str[str.length - 1] === ']') {
        str = convert(JSON.parse(str));
    } else if (str[0] === '{' && str[str.length - 1] === '}') {
        str = convert(JSON.parse(str));
    } else if (str[0] === '/' && str[str.length - 1] === '/') {
        str = str.slice(1, str.length - 1);
        str = new RegExp(str);
    } else if (str.replace('regex:', '') !== str) {
        str = new RegExp(str.replace('regex:', ''));
    } else if (str.replace('vendor_path:', '') !== str) {
        str = path.join(vendor, str.replace('vendor_path:', ''));
    } else if (str.replace('working_dir:', '') !== str) {
        str = path.join(path.resolve(process.cwd()), str.replace('working_dir:', ''));
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

        arr = arr.filter(function (val) {
            return typeof val === 'string' || !!val;
        });
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
    if (typeof value === 'string') {
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
    var optionsWP;
    var compiler;

    // Set a base
    entryDir = path.dirname(options.entry);

    // Lets take care of the options for webpack
    optionsWP = convert(options);
    optionsWP.entry = convertEntry(optionsWP.entry);
    optionsWP.plugins = convertPlugins(optionsWP.plugins);

    // Bundle!
    compiler = webpack(optionsWP);

    // Run now
    compiler.run(function (err) {
        if (err) {
            throw err;
        }
    });
};

// ---------------------------------------------
// Runtime

var errPath = path.join(vendor, '../log');
var errFile = path.join(errPath, 'webpack_error.log');

// Remove old error log
if (fs.existsSync(errFile)) {
    fs.unlinkSync(errFile);
}

// Catch the uncaught errors
process.on('uncaughtException', function (err) {
    var data = '';
    data += '///////////////////////////////\nWEBPACK ERROR:\n\n';
    data += err;
    data += '\n\n///////////////////////////////\nWEBPACK OPTIONS:\n\n';
    data += JSON.stringify(convert(JSON.parse(opts)), null, 4);

    // Lets create the log folder if it doesn't exist
    if (!fs.existsSync(errPath)) {
        fs.mkdirSync(errPath);
    }

    fs.writeFileSync(errFile, data, 'utf-8');

    // Now lets error!
    throw err;
});

// Set the task
task(JSON.parse(opts));
