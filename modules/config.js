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
// PUBLIC FUNCTIONS

/**
 * Copies * from source to destination
 * @param  {string} file
 * @return {object}
 */
function get(file) {
    validate.type(
        { file: file },
        { file: Joi.string() }
    );

    var configPath = tools.getAbsolute(file);

    if (tools.notExist(configPath)) {
        return tools.logErr('config', 'Config file doesn\'t exist!');
    }

    // Read the config file
    var file = fs.readFileSync(configPath);
    var obj = normalize(toml.parse(file));

    // Check the final object
    var promise = validate.type(
        { config: obj },
        { config: struct },
    true)
    .then(function (val) {
        return val.config;
    })
    .catch(function (err) {
        tools.logErr('config', err);
    });

    // Now lets return the promise
    return promise;
}

// -----------------------------------------
// PRIVATE FUNCTIONS

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
        key = keys[i].toLowerCase().split('_').reduce(function (val1, val2, i) {
            return val1 + val2.slice(0, 1).toUpperCase() + val2.slice(1, val2.length);
        });

        key = normalizeKeyName(key);
        obj[key] = normalize(val[keys[i]]);
    }

    return obj;
}

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

// -----------------------------------------
// EXPORTS

module.exports = { struct: struct, get: get };
