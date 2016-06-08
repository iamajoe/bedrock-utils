'use strict';

// -----------------------------------------
// IMPORTS

var fs = require('fs');
var toml = require('toml');
var Joi = require('joi');

var tools = require('./tools/main');
var validate = tools.validate;

var create = require('./create');
var file = require('./file');
var style = require('./style');
var script = require('./script');
var raw = require('./raw');
var server = require('./server');

// -----------------------------------------
// VARS

var struct = Joi.object().keys({
    baseDir: Joi.string(),
    maxOrder: Joi.number().default(30),
    copy: Joi.array().items(file.struct).default([]),
    rename: Joi.array().items(file.struct).default([]),
    remove: Joi.array().items(file.struct).default([]),
    create: Joi.array().items(create.struct).default([]),
    style: Joi.array().items(style.struct).default([]),
    script: Joi.array().items(script.struct).default([]),
    raw: Joi.array().items(raw.struct).default([]),
    server: server.struct
});

// -----------------------------------------
// PRIVATE FUNCTIONS

/**
 * Normalizes key name
 * @param  {string} key
 * @return {string}
 */
function normalizeKeyName(key) {
    validate.type(
        { key: key },
        { key: Joi.string() }
    );

    switch (key) {
    case 'source':
        key = 'src';
        break;
    case 'destination':
        key = 'dest';
        break;
    default:
        key = key;
    }

    return key;
}

/**
 * Normalizes object to be as expected
 * @param  {obj} val
 * @return {obj}
 */
function normalizeObject(val) {
    var keys = Object.keys(val);
    var obj = {};
    var key;
    var i;

    // Now set all the keys in the new obj
    for (i = 0; i < keys.length; i += 1) {
        key = keys[i].toLowerCase().split('_').reduce(function (val1, val2) {
            return val1 + val2.slice(0, 1).toUpperCase() + val2.slice(1, val2.length);
        });

        key = normalizeKeyName(key);
        obj[key] = normalize(val[keys[i]]);
    }

    return obj;
}

/**
 * Normalizes * to be as expected
 * @param  {*} val
 * @return {*}
 */
function normalize(val) {
    if (tools.isArray(val)) {
        return val.map(function (value) {
            return normalize(value);
        });
    }

    if (typeof val !== 'object') {
        return val;
    }

    return normalizeObject(val);
}

// -----------------------------------------
// PUBLIC FUNCTIONS

/**
 * Copies * from source to destination
 * @param  {string} file
 * @return {object}
 */
function get(fileObj) {
    var configPath;
    var fileRead;
    var promise;
    var obj;

    validate.type(
        { fileObj: fileObj },
        { fileObj: Joi.string() }
    );

    configPath = tools.getAbsolute(fileObj);
    if (tools.notExist(configPath)) {
        return tools.logErr('Config file doesn\'t exist!');
    }

    // Read the config file
    fileRead = fs.readFileSync(configPath);
    obj = normalize(toml.parse(fileRead));

    // Set the base dir
    obj.baseDir = tools.getDir(configPath);
    tools.setBasePath(obj.baseDir);

    // Check the final object
    promise = validate.type(
        { config: obj },
        { config: struct },
    true)
    .then(function (val) {
        return val.config;
    })
    .catch(function (err) {
        tools.logErr(err);
    });

    // Now lets return the promise
    return promise;
}

// -----------------------------------------
// EXPORTS

module.exports = {
    struct: struct,
    get: get
};
